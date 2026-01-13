import * as userModel from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export async function getMe(userId) {
  const user = await userModel.getUserById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
}
