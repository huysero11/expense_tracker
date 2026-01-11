import * as authService from "../services/auth.service.js";

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
    const { accessToken, user } = await authService.login({ email, password });

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
