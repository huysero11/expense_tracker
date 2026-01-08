import * as userModel from "../models/user.model.js";
import { hashPassword } from "../utils/password.util.js";
import { AppError } from "../utils/AppError.js";

export async function register({ email, password, fullName }) {
  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser) {
    throw new AppError("User with this email already exists", 400);
  }

  const passwordHash = await hashPassword(password);
  const newUser = await userModel.createUser({ email, passwordHash, fullName });

  return newUser;
}
