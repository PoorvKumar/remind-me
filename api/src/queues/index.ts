import Bull from "bull";

export const remindersQueue=new Bull("remindersQueue");
export const emailQueue=new Bull("emailQueue");

export function initializeQueues()
{
    console.log("Queues initialized!");
}