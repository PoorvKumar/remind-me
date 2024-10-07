import { Queue } from "bullmq";
import { redisConnection } from "../config/redis";

export const reminderQueue = new Queue("reminders", {
  connection: redisConnection,
});
