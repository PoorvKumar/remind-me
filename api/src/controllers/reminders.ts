import { NextFunction, Request, Response } from "express";
import { remindersQueue } from "../queues";

export class RemindersController 
{
    async createReminder(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const { title, link, delay }=req.body;
            await remindersQueue.add({ title, link },{ delay: delay*1000});

            return res.json({ message: "Reminder created!" });
        }
        catch(err)
        {
            next(err);
        }
    }
}

export const reminderController=new RemindersController();