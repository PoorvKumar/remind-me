import { Repository } from "typeorm";
import { Reminder } from "../entity/Reminder";
import { AppDataSource } from "../config/data-source";
import { WorkerService } from "./workerService";
import { Job } from "bullmq";
// import { reminderQueue } from "../queues";

export class ReminderService extends WorkerService
{
    private reminderRepository: Repository<Reminder>;

    constructor()
    {
        super();
        this.reminderRepository=AppDataSource.getRepository(Reminder);
    }

    async processJobs(job: Job): Promise<void>
    {
        const { reminderId }=job.data;
        const reminder=await this.reminderRepository.findOne({
            where: { id: reminderId }
        });

        if(reminder)
        {
            console.log(`Processing reminder: ${reminder.id} | ${reminder.title}`);
            reminder.status="completed";
            await this.reminderRepository.save(reminder);
        }
    }

    async getAll(): Promise<Reminder[]>
    {
        return await this.reminderRepository.find();
    }

    async getAllOfUser(userId: number): Promise<Reminder[]>
    {
        return await this.reminderRepository.find({
            where: { user: { id: userId } }
        });
    }

    async createReminder(reminder: Reminder): Promise<Reminder>
    {
        const savedReminder= await this.reminderRepository.save(reminder);

        const delay=new Date(reminder.dueDate).getTime() - new Date().getTime();
        // await reminderQueue.add({ reminderId: savedReminder.id },{ delay });

        return savedReminder;
    }
}