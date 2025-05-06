import { Request, Response, NextFunction } from "express";
import {
  updateUserData,
  getUserData,
  getUserIdByEmail,
} from "../services/user.service";
import { ApiError } from "../entities/api-error.entity";

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) return next(new ApiError("Missing userId", 400));

    const user = await getUserData(userId);
    if (!user) return next(new ApiError("User not found", 404));

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, data } = req.body;
    if (!userId || !data) return next(new ApiError("Invalid request body", 400));

    const user = await updateUserData(userId, data);
    res
      .status(200)
      .json({ ...user, message: "User data updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const getUserIdByEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.params;
    if (!email) return next(new ApiError("Missing email", 400));

    const userId = await getUserIdByEmail(email);
    if (!userId) return next(new ApiError("User not found", 404));

    res.status(200).json({ userId });
  } catch (err) {
    next(err);
  }
};
