import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";

export class UserController
{
    private userService: UserService;

    constructor()
    {
        this.userService=new UserService();
    }

    async getProfile(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const user=await this.userService.getProfile(req.user);
            res.status(200).json({user});
        }
        catch(err)
        {
            next(err);
        }
    }

    async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const updatedUser=await this.userService.updateProfile(req.user,req.body);
            res.status(200).json({ user: updatedUser });
        }
        catch(err)
        {
            next(err);
        }
    }

    async deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            await this.userService.deleteAccount(req.user);
            res.status(204).send('Success');
        }
        catch(err)
        {
            next(err);
        }
    }
}