import * as authService from "../services/auth.service.js";
import { AppError } from "../utils/AppError.js";
import { getRefreshCookieOptions } from "../utils/cookie.util.js";

export async function register(req, res, next) {
  try {
    const { email, password, fullName } = req.body;
    const user = await authService.register({ email, password, fullName });

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await authService.login({
      email,
      password,
    });
    res.cookie("refresh_token", refreshToken, getRefreshCookieOptions());

    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        accessToken,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function refresh(req, res, next) {
  try {
    // console.log("[refresh] req.headers.cookie =", req.headers.cookie);
    // console.log("[refresh] req.cookies =", req.cookies);

    const token = req.cookies?.refresh_token;
    if (!token) {
      throw new AppError("Refresh token not found", 401);
    }

    const { accessToken, refreshToken } = await authService.refresh({
      refreshToken: token,
    });
    res.cookie("refresh_token", refreshToken, getRefreshCookieOptions());

    return res.status(200).json({
      status: "success",
      message: "Token refreshed successfully",
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    const token = req.cookies?.refresh_token;
    if (token) {
      await authService.logout({ refreshToken: token });
    }
    res.clearCookie("refresh_token", getRefreshCookieOptions());

    return res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}
