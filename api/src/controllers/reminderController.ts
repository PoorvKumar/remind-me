import { NextFunction, Request, Response } from "express";
import { ReminderService } from "../services/reminderService";
import { User } from "../entity/User";

export class ReminderController
{
    private reminderService: ReminderService;

    constructor()
    {
        this.reminderService=new ReminderService();
    }

    async createReminder(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const reminder=await this.reminderService.createReminder(req.body,req.user);
            res.status(201).json(reminder);
        }
        catch(err)
        {
            console.log(err);
            res.status(400).json({ message: err.message });
        }
    }

    async updateReminder(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const reminder=await this.reminderService.updateReminder(parseInt(req.params.id),req.body,req.user);
            res.status(200).json(reminder);
        }
        catch(err)
        {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteReminder(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            await this.reminderService.deleteReminder(parseInt(req.params.id),req.user);
            res.status(204).send();
        }
        catch(err)
        {
            res.status(400).json({ message: err.message });
        }
    }

    async getReminder(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const reminder=await this.reminderService.getReminder(parseInt(req.params.id),req.user);
            res.status(200).json(reminder);
        }
        catch(err)
        {
            res.status(400).json({ message: err.message });
        }
    }

    async getAllReminders(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const reminders=await this.reminderService.getAllOfUser(req.user.id);
            res.status(200).json(reminders);
        }
        catch(err)
        {
            res.status(400).json({ message: err.message });
        }
    }
}