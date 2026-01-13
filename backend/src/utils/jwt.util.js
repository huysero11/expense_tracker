import jwt from "jsonwebtoken";
import { AppError } from "./AppError.js";

const JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || "your_default_access_secret";
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || "15m";

const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "your_default_refresh_secret";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

export function signAccessToken(userId) {
  const tokenString = jwt.sign({ sub: String(userId) }, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRES_IN,
  });
  return tokenString;
}

export function verifyAccessToken(token) {
  try {
    const payload = jwt.verify(token, JWT_ACCESS_SECRET);
    return payload; // { sub: userId, iat: ..., exp: ... }
  } catch (error) {
    throw new AppError("Invalid or expired access token", 401);
  }
}

export function signRefreshToken(userId) {
  const tokenString = jwt.sign({ sub: String(userId) }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });

  return tokenString;
}

export function verifyRefreshToken(token) {
  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET);
    return payload; // { sub: userId, iat: ..., exp: ... }
  } catch (error) {
    throw new AppError("Invalid or expired refresh token", 401);
  }
}
