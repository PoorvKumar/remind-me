import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/userController";

const router=Router();
const userController=new UserController();

router.use(authenticateJWT);

router.get('/',userController.getProfile.bind(userController));
router.patch('/',userController.updateProfile.bind(userController));
router.delete('/',authenticateJWT,userController.deleteAccount.bind(userController));
router.post('/fcm-token',authenticateJWT,userController.saveFCMToken.bind(userController));

export default router;