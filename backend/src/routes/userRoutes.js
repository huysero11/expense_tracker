import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import * as authMiddleware from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/me", authMiddleware.requireAuth, userController.getMe);

export default router;
