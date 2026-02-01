import { Router } from "express";
import * as transactionsController from "../controllers/transactions.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware.requireAuth,
  transactionsController.createTransaction,
);

export default router;
