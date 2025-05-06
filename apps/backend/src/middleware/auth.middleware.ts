//apps/backend/src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import { ApiError } from "../entities/api-error.entity";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new ApiError("Unauthorized", 401));

  try {
    await admin.auth().verifyIdToken(token);
    next();
  } catch {
    next(new ApiError("Unauthorized", 401));
  }
};
