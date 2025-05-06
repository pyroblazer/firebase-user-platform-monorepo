import { authMiddleware } from "../../src/middleware/auth.middleware";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../src/entities/api-error.entity";
import * as admin from "firebase-admin";

// Create a mock for verifyIdToken
const verifyIdToken = jest.fn();

// Mock firebase-admin with a mock implementation of auth()
jest.mock("firebase-admin", () => ({
  __esModule: true,
  default: {
    auth: jest.fn(() => ({
      verifyIdToken,
    })),
  },
}));

describe("authMiddleware", () => {
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call next on valid token", async () => {
    const req = { headers: { authorization: "Bearer validtoken" } } as Request;
    const res = {} as Response;

    verifyIdToken.mockResolvedValue({ uid: "user-123" });

    await authMiddleware(req, res, next);
    expect(verifyIdToken).toHaveBeenCalledWith("validtoken");
    expect(next).toHaveBeenCalledWith(); // no error passed
  });

  it("should return 401 if no token is provided", async () => {
    const req = { headers: {} } as Request;
    const res = {} as Response;

    await authMiddleware(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect((next as jest.Mock).mock.calls[0][0].status).toBe(401);
  });

  it("should return 401 if token is invalid", async () => {
    const req = { headers: { authorization: "Bearer invalidtoken" } } as Request;
    const res = {} as Response;

    verifyIdToken.mockRejectedValue(new Error("Invalid token"));

    await authMiddleware(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect((next as jest.Mock).mock.calls[0][0].status).toBe(401);
  });
});
