import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { ReminderController } from "../controllers/reminderController";

const router=Router();
const reminderController=new ReminderController();

router.use(authenticateJWT);

router.post('/',reminderController.createReminder.bind(reminderController));
router.patch('/:id',reminderController.updateReminder.bind(reminderController));
router.delete('/:id',reminderController.deleteReminder.bind(reminderController));
router.get('/:id',reminderController.getReminder.bind(reminderController));
router.get('/',reminderController.getAllReminders.bind(reminderController));

export default router;