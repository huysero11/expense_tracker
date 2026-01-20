import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
} from "../controllers/categories.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", requireAuth, createCategory);
router.get("/", requireAuth, getCategories);
router.put("/:id", requireAuth, updateCategory);

export default router;
