import * as userService from "../services/user.service.js";
import { AppError } from "../utils/AppError.js";

export async function getMe(req, res, next) {
  // console.log("[getMe] req.user =", req.user);
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const user = await userService.getMe(userId);

    return res.status(200).json({
      status: "success",
      message: "User profile retrieved successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}
