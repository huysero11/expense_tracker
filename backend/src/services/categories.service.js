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

export async function getCategories({ userId, type }) {
  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  if (type && !isValidType(type)) {
    throw new AppError(
      "Category type must be either 'expense' or 'income'",
      400,
    );
  }

  const categories = await categoryModel.getCategories(userId, type);
  return categories;
}

export async function updateCategory({ userId, id, name, type }) {
  if (!userId) {
    throw new AppError("Logged in require!", 401);
  }

  const categoryId = Number(id);
  if (!categoryId) {
    throw new AppError("Category id is invalid", 400);
  }

  const normalizedName = normalizeName(name);
  if (!normalizedName) {
    throw new AppError("Category name is required", 400);
  }

  if (type && !isValidType(type)) {
    throw new AppError("Category type must be 'expense' or 'income'", 400);
  }

  const existing = await categoryModel.getCategoryById(categoryId);
  if (!existing) {
    throw new AppError("Category not found", 404);
  }
  if (Number(existing.userId) !== Number(userId)) {
    throw new AppError("Category not found", 404);
  }

  try {
    const ok = await categoryModel.updateCategory({
      id: categoryId,
      userId,
      name: normalizedName,
      type,
    });

    if (!ok) {
      throw new AppError("Category not found", 404);
    }

    const updated = await categoryModel.getCategoryById(categoryId);
    return updated;
  } catch (error) {
    if (err?.code === "ER_DUP_ENTRY") {
      throw new AppError("Category already exists", 409);
    }
    throw err;
  }
}
