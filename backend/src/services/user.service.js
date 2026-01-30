import * as userModel from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export async function getMe(userId) {
  const user = await userModel.getUserById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
}

export async function updateMe(userId, { fullName }) {
  const name = String(fullName ?? "").trim();

  if (!name) throw new AppError("fullName is required", 400);
  if (name.length > 100)
    throw new AppError("fullName is too long (max 100)", 400);

  const existing = await userModel.getUserById(userId);
  if (!existing) throw new AppError("User not found", 404);

  // update
  const ok = await userModel.updateUserById({ id: userId, fullName: name });
  if (!ok) {
    throw new AppError("Update user failed!", 500);
  }

  // return updated user
  const updatedUser = await userModel.getUserById(userId);
  return updatedUser;
}
