import { Router } from "express";
import * as transactionsController from "../controllers/transactions.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware.requireAuth,
  transactionsController.createTransaction,
);

router.get(
  "/",
  authMiddleware.requireAuth,
  transactionsController.getTransactions,
);

router.put(
  "/:id",
  authMiddleware.requireAuth,
  transactionsController.updateTransaction,
);

router.delete(
  "/:id",
  authMiddleware.requireAuth,
  transactionsController.deleteTransaction,
);

export default router;
