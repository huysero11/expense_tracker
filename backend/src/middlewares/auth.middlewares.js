import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.util.js";

export function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authorization header missing or malformed", 401);
    }

    const token = authHeader.slice("Bearer ".length).trim();
    if (!token) {
      throw new AppError("Token not found", 401);
    }

    const payload = verifyAccessToken(token);
    // console.log("[requireAuth] payload =", payload);

    req.user = {
      userId: Number(payload.sub),
    };
    // console.log("[requireAuth] req.user =", req.user);

    return next();
  } catch (error) {
    return next(error);
  }
}
