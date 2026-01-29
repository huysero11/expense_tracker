import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", authMiddleware.requireAuth, userController.getMe);
router.patch("/me", authMiddleware.requireAuth, userController.updateMe);

export default router;
