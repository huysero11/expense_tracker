import * as categoryModel from "../models/category.model.js";
import { AppError } from "../utils/AppError.js";

function normalizeName(name) {
  return String(name || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function isValidType(type) {
  return type === "expense" || type === "income";
}

export async function createCategory({ userId, name, type }) {
  const normalizedName = normalizeName(name);

  if (!userId) {
    throw new AppError("User ID is required", 400);
  }
  if (!normalizedName) {
    throw new AppError("Category name is required", 400);
  }
  if (!isValidType(type)) {
    throw new AppError(
      "Category type must be either 'expense' or 'income'",
      400,
    );
  }

  try {
    const res = await categoryModel.createCategory({
      userId,
      name: normalizedName,
      type,
    });

    return res;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new AppError(
        "Category with the same name and type already exists",
        409,
      );
    }
  }
}
