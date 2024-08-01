import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/userController";

const router=Router();
const userController=new UserController();

router.use(authenticateJWT);

router.get('/',userController.getProfile.bind(userController));
router.patch('/',userController.updateProfile.bind(userController));
router.delete('/',userController.deleteAccount.bind(userController));

export default router;