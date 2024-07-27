import { Job } from "bull";

export async function processReminders(job: Job)
{
    const { title, link }=job.data;
    console.log(`Sending reminder for ${title} at ${link}`, job.id);

    //check recurring reminder
    // Emit SSE or Push Notification
}