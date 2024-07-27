import { Router } from "express";
import { AuthController } from "../controllers/authController";

const authController=new AuthController();
const router=Router();

router.post('/register',authController.register.bind(authController));
router.post('/login',authController.login.bind(authController));
router.get('/google/url',authController.integrateGoogle.bind(authController));
router.get('/google/callback',authController.googleCallback.bind(authController));

export default router;