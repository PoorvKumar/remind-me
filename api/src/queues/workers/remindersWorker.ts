import { ReminderService } from "../../services/reminderService";
import { WorkerConfig } from "./workerSetup";

export const reminderWorkerConfig: WorkerConfig = {
  name: "reminders",
  ServiceClass: ReminderService,
};
