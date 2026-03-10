import { Router } from "express";
import { loginController, signupController, verifyEmailController } from "../controllers/auth.controllers";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.patch("/verify/email", verifyEmailController);


export default router;