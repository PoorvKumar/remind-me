import { Router } from "express";
import { reminderController } from "../controllers/reminders";

const router=Router();

router.post('/',reminderController.createReminder);

export default router;