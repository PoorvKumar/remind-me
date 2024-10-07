import { In, Repository } from "typeorm";
import { Reminder } from "../entity/Reminder";
import { AppDataSource } from "../config/data-source";
import { WorkerService } from "./workerService";
import { Job } from "bullmq";
import { reminderQueue } from "../queues";
import { Link } from "../entity/Link";
import { Tag } from "../entity/Tag";
import { User } from "../entity/User";
import { NotificationService } from "./notificationService";
// import { reminderQueue } from "../queues";

export class ReminderService extends WorkerService {
  private reminderRepository: Repository<Reminder>;
  private linkRepository: Repository<Link>;
  private tagRepository: Repository<Tag>;
  private notificationService: NotificationService;

  constructor() {
    super();
    this.reminderRepository = AppDataSource.getRepository(Reminder);
    this.linkRepository = AppDataSource.getRepository(Link);
    this.tagRepository = AppDataSource.getRepository(Tag);
    this.notificationService = new NotificationService();
  }

  async getAll(): Promise<Reminder[]> {
    return await this.reminderRepository.find();
  }

  async getAllOfUser(userId: number): Promise<Reminder[]> {
    return await this.reminderRepository.find({
      where: { user: { id: userId } },
      relations: ["links", "tags"],
      order: { dueDate: "ASC" },
    });
  }

  async getRemainingOfUser(userId: number): Promise<Reminder[]> {
    return await this.reminderRepository.find({
      where: { user: { id: userId }, status: In(["pending", "overdue"]) },
      relations: ["links", "tags"],
      order: { dueDate: "ASC" },
    });
  }

  async getReminder(id: number, user: User): Promise<Reminder> {
    return await this.reminderRepository.findOneOrFail({
      where: { id, user: { id: user.id } },
      relations: ["links", "tags"],
    });
  }

  async createReminder(
    reminderData: Partial<Reminder>,
    user: User,
  ): Promise<Reminder> {
    // console.log("Creating reminder with data:", reminderData);
    return await AppDataSource.manager.transaction(
      async (transactionalEntityManager) => {
        const { title, description, dueDate, links, tags } = reminderData;
        const reminder = this.reminderRepository.create({
          title,
          description,
          dueDate,
          user,
        });

        await transactionalEntityManager.save(reminder);
        // console.log("Saved reminder:", reminder);

        if (links) {
          const newLinks = links.map((link) =>
            this.linkRepository.create({ ...link, reminder }),
          );
          await transactionalEntityManager.save(newLinks);
          reminder.links = newLinks;
        }

        // console.log("Saved reminder with links:", reminder);

        if (tags && tags.length > 0) {
          const tagEntities = await Promise.all(
            tags.map(async (tg) => {
              let tag = await this.tagRepository.findOne({
                where: { name: tg.name },
              });
              if (!tag) {
                tag = this.tagRepository.create({ name: tg.name });
                await transactionalEntityManager.save(tag);
              }
              return tag;
            }),
          );
          reminder.tags = tagEntities;
        }

        console.log("Saved reminder with links and tags:", reminder);

        await transactionalEntityManager.save(reminder);
        await this.scheduleReminder(reminder);
        return reminder;
      },
    );
  }

  async updateReminder(
    id: number,
    reminderData: Partial<Reminder>,
    user: User,
  ): Promise<Reminder> {
    return await AppDataSource.manager.transaction(
      async (transactionalEntityManager) => {
        const reminder = await this.reminderRepository.findOneOrFail({
          where: { id, user: { id: user.id } },
          relations: ["links", "tags"],
        });

        if (!reminder) throw new Error("Reminder not found or unauthorized!");

        const { title, description, status, dueDate, recurrence, links, tags } =
          reminderData;

        if (title) reminder.title = title;
        if (description) reminder.description = description;
        if (dueDate) reminder.dueDate = dueDate;
        if (status) reminder.status = status;
        if (recurrence) reminder.recurrence = recurrence;

        console.log("Updated reminder w/o links and tags:", reminder);

        if (links) {
          await transactionalEntityManager.remove(reminder.links);
          const newLinks = links.map((link) =>
            this.linkRepository.create({ ...link, reminder }),
          );
          reminder.links = await transactionalEntityManager.save(newLinks);
        }

        if (tags) {
          reminder.tags = [];
          await transactionalEntityManager.save(reminder);

          const tagEntities = await Promise.all(
            tags.map(async (tg) => {
              let tag = await this.tagRepository.findOne({
                where: { name: tg.name },
              });
              if (!tag) {
                tag = this.tagRepository.create({ name: tg.name });
                await transactionalEntityManager.save(tag);
              }
              return tag;
            }),
          );

          reminder.tags = tagEntities;
        }

        // console.log("Updated reminder with links and tags:",reminder);

        await transactionalEntityManager.save(reminder);

        if (dueDate) {
          await reminderQueue.remove(`reminder-${reminder.id}`);
          await this.scheduleReminder(reminder);
        }

        return reminder;
      },
    );
  }

  async deleteReminder(id: number, user: User): Promise<void> {
    await AppDataSource.manager.transaction(
      async (transactionalEntityManager) => {
        const reminder = await this.reminderRepository.findOne({
          where: { id },
          relations: ["links", "tags", "user"],
        });

        if (!reminder) throw new Error("Reminder not found or unauthorized!");

        if (reminder.links && reminder.links.length > 0) {
          await transactionalEntityManager.remove(reminder.links);
        }

        reminder.tags = [];
        await transactionalEntityManager.save(reminder);

        await reminderQueue.remove(`reminder-${reminder.id}`);
        await transactionalEntityManager.remove(reminder);
      },
    );
  }

  async scheduleReminder(reminder: Reminder): Promise<void> {
    if (reminder.status === "completed") return;
    const dueDate = new Date(reminder.dueDate);
    if (isNaN(dueDate.getTime())) {
      throw new Error("Invalid due date");
    }
    const delay = dueDate.getTime() - Date.now();
    if (isNaN(delay) || !isFinite(delay)) {
      throw new Error("Invalid delay calculated");
    }
    const jobId = `reminder-${reminder.id.toString()}`;
    console.log("Scheduling reminder with ID:", jobId);
    await reminderQueue.add(
      "process-reminder",
      { reminderId: reminder.id },
      {
        jobId,
        delay: Math.max(delay, 0),
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
  }

  async processJobs(job: Job): Promise<void> {
    const { reminderId } = job.data;
    const reminder = await this.reminderRepository.findOneOrFail({
      where: { id: reminderId },
      relations: ["user"],
    });

    const user = reminder.user;
    if (!user) {
      console.log("User not found for reminder:", reminder);
      return;
    }

    const fcmToken = user.fcmToken;
    if (!fcmToken) {
      console.log("User has no FCM token:", user);
      return;
    }

    console.log("Processing reminder:", reminder);

    if (reminder) {
      await this.notificationService.sendNotification(fcmToken, reminder);

      reminder.status = "overdue";
      await this.reminderRepository.save(reminder);
    }
  }
}
