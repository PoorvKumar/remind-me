import { Job } from "bullmq";

export abstract class WorkerService {
  abstract processJobs(job: Job): Promise<void>;
}
