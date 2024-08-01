import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes";
import reminderRouter from "./routes/reminderRoutes";
import userRouter from "./routes/userRoutes";

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

app.get('/',(req: Request, res: Response, next: NextFunction)=>
{
    return res.json({ message: "API running!" });
});

app.use('/api/auth',authRouter);
app.use('/api/reminder',reminderRouter);
app.use('/api/user',userRouter);

app.use((err: Error,req: Request,res: Response,next: NextFunction)=>
{
    console.error(err.stack);
    res.status(500).send("Something Broke!");
});

export default app;