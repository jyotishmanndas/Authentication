import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { getProfileController } from "../controllers/user.controllers";

const router = Router();

router.use(verifyJWT);

router.get("/profile", getProfileController);


export default router;