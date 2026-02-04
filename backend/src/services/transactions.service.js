import * as transactionModel from "../models/transaction.model.js";
import * as categoryModel from "../models/category.model.js";
import { AppError } from "../utils/AppError.js";

function isValidDateYYYYMMDD(s) {
  if (!s) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(s))) return false;

  // Basic calendar check
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

export async function createTransaction({
  userId,
  categoryId,
  amount,
  transDate,
  note,
}) {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const catId = Number(categoryId);
  if (!catId) {
    throw new AppError("categoryId is invalid", 400);
  }

  const amt = Number(amount);
  if (!Number.isFinite(amt) || amt <= 0) {
    throw new AppError("amount must be a number greater than 0", 400);
  }

  if (!isValidDateYYYYMMDD(transDate)) {
    throw new AppError("transDate must be in YYYY-MM-DD format", 400);
  }

  /**
   * check if category existed
   */
  const category = await categoryModel.getCategoryById(catId);
  // console.log("[createTransaction, service] category =", category);

  if (!category) {
    throw new AppError("Category not found!", 404);
  }
  if (Number(category.userId) !== Number(userId)) {
    throw new AppError("Category not found!", 404);
  }

  /**Derive type from the selected category */
  const type = category.type;

  const normalizedNote =
    note === null || note === undefined ? null : String(note).trim() || null;

  const transaction = await transactionModel.createTransaction({
    userId,
    categoryId: catId,
    type,
    amount: amt,
    transDate,
    note: normalizedNote,
  });

  return transaction;
}

export async function getTransactions({ userId }) {
  if (!userId) {
    throw new AppError("Unauthorized!", 401);
  }

  const transactions = await transactionModel.getTransactions(userId);
  return transactions;
}

export async function updateTransaction({
  userId,
  id,
  categoryId,
  amount,
  transDate,
  note,
}) {
  if (!userId) {
    throw new AppError("Unauthorized!", 400);
  }

  const transactionId = Number(id);
  if (!transactionId) {
    throw new AppError("Transaction id is not valid!", 400);
  }

  const catId = Number(categoryId);
  if (!catId) {
    throw new AppError("Category id is not valid", 400);
  }

  const amt = Number(amount);
  if (!Number.isFinite(amt) || amt <= 0) {
    throw new AppError("amount must be a number greater than 0", 400);
  }

  if (!isValidDateYYYYMMDD(transDate)) {
    throw new AppError("transDate must be in YYYY-MM-DD format", 400);
  }

  const normalizedNote =
    note === null || note === undefined ? null : String(note).trim() || null;

  /**
   * Check if transaction existed and belong to user
   */
  const existing = await transactionModel.getTransactionById(id);
  if (!existing) {
    throw new AppError("Transaction does not exist!", 404);
  }
  if (Number(existing.userId) !== Number(userId)) {
    throw new AppError("Transaction id is not the same with userId", 404);
  }

  /**
   * Check if category existed and belong to user
   */
  const category = await categoryModel.getCategoryById(catId);
  if (!category) {
    throw new AppError("Category not found", 404);
  }
  if (Number(category.userId) !== Number(userId)) {
    throw new AppError("Category not found", 404);
  }

  // type derived from category
  const type = category.type;

  const ok = await transactionModel.updateTransaction({
    id: transactionId,
    userId,
    categoryId: catId,
    type,
    amount: amt,
    transDate,
    note: normalizedNote,
  });

  if (!ok) {
    throw new AppError("Transaction not found", 404);
  }

  const updated = await transactionModel.getTransactionById(transactionId);
  return updated;
}

export async function deleteTransaction({ id, userId }) {
  if (!userId) {
    throw new AppError("Unauthorized!", 401);
  }

  const transactionId = Number(id);
  if (!transactionId) {
    throw new AppError("Transaction id is invalid", 400);
  }

  // check exists + belongs to user
  const existing = await transactionModel.getTransactionById(transactionId);
  if (!existing) {
    throw new AppError("Transaction not found", 404);
  }
  if (Number(existing.userId) !== Number(userId)) {
    throw new AppError("Transaction not found", 404);
  }

  const ok = await transactionModel.deleteTransaction({
    id: transactionId,
    userId,
  });

  if (!ok) {
    throw new AppError("Transaction not found", 404);
  }

  return true;
}
