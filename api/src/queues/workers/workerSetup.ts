import { Job, Worker } from "bullmq";
import { WorkerService } from "../../services/workerService";
import { redisConnection } from "../../config/redis";

export interface WorkerConfig {
  name: string;
  ServiceClass: new () => WorkerService; // constructor signature -> when called with new keyword will create an instance of class WorkerService
}

const workers: Worker[] = [];

export async function setupWorkers(
  workerConfigs: WorkerConfig[],
): Promise<void> {
  workerConfigs.forEach(({ name, ServiceClass }) => {
    const service = new ServiceClass();

    const worker = new Worker(
      name,
      async (job: Job) => service.processJobs(job),
      {
        connection: redisConnection,
      },
    );

    worker.on("completed", (job: Job) => {
      console.log(`${name} - Job completed: ${job.id}`);
    });

    worker.on("failed", (job: Job, err) => {
      console.error(`${name} - Job failed: ${job.id} | ${err.message}`);
    });

    workers.push(worker);
    // console.log(`Worker ${name} initialized`);
  });

  console.log(`Workers setup successfully!`);
}

export function getAllWorkers(): Worker[] {
  return workers;
}
