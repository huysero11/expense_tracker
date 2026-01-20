import { Router } from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categories.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", requireAuth, createCategory);
router.get("/", requireAuth, getCategories);

export default router;
