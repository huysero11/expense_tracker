import * as userModel from "../models/user.model.js";
import * as refreshTokenService from "./refreshToken.service.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";
import { AppError } from "../utils/AppError.js";
import { signAccessToken } from "../utils/jwt.util.js";

export async function register({ email, password, fullName }) {
  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser) {
    throw new AppError("User with this email already exists", 400);
  }

  const passwordHash = await hashPassword(password);
  const newUser = await userModel.createUser({ email, passwordHash, fullName });

  return newUser;
}

export async function login({ email, password }) {
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  /* Check if user existed*/
  const user = await userModel.getUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  /* Check password match */
  const isPasswordValid = await comparePassword(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  /* Sign JWT */
  const accessToken = signAccessToken(user.id);
  const refreshToken = await refreshTokenService.issueRefreshToken(user.id);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    },
  };
}

export async function refresh({ refreshToken }) {
  const { userId, newRefreshToken } =
    await refreshTokenService.rotateRefreshToken(refreshToken);
  const accessToken = signAccessToken(userId);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
}

export async function logout({ refreshToken }) {
  await refreshTokenService.revokeRefreshToken(refreshToken);
}
