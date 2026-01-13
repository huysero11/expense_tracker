import * as refreshTokenModel from "../models/refreshToken.model.js";
import { sha256 } from "../utils/crypto.util.js";
import { AppError } from "../utils/AppError.js";
import { signRefreshToken, verifyRefreshToken } from "../utils/jwt.util.js";

const computeRefreshExpiresAt = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);

  return d;
};

/* Sign new refresh token, add to db */
export async function issueRefreshToken(userId) {
  const refreshToken = signRefreshToken(userId);

  const tokenHash = sha256(refreshToken);
  const expiresAt = computeRefreshExpiresAt();
  await refreshTokenModel.createRefreshToken({ userId, tokenHash, expiresAt });

  return refreshToken;
}

/*validate the current refresh token (including signature and claims), then create new one and revoke the old one */
export async function rotateRefreshToken(oldRefreshToken) {
  if (!oldRefreshToken) {
    throw new AppError("Refresh token is required", 400);
  }

  const payload = verifyRefreshToken(oldRefreshToken);

  /* Check if userId not the same as it in db */
  const userId = Number(payload.sub);
  if (!userId) {
    throw new AppError("Invalid refresh token payload", 401);
  }

  const oldHash = sha256(oldRefreshToken);
  const record = await refreshTokenModel.findValidByHash(oldHash);
  if (!record) {
    throw new AppError("Refresh token is invalid or expired", 401);
  }

  if (Number(record.user_id) !== userId) {
    throw new AppError("Refresh token user mismatch", 401);
  }

  /* rotate */
  const newRefreshToken = signRefreshToken(userId);
  const newHash = sha256(newRefreshToken);
  await refreshTokenModel.rotate({ oldHash, newHash });

  return { userId, newRefreshToken };
}

export async function revokeRefreshToken(refreshToken) {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 400);
  }

  const tokenHash = sha256(refreshToken);
  await refreshTokenModel.revokeByHash(tokenHash);
}
