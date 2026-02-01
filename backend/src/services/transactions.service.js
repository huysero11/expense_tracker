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
