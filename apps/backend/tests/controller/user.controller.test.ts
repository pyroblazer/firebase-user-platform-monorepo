import { Request, Response, NextFunction } from "express";
import {
  getUserController,
  updateUserController,
  getUserIdByEmailController,
} from "../../src/controller/user.controller";
import * as service from "../../src/services/user.service";
import { ApiError } from "../../src/entities/api-error.entity";

jest.mock("../../src/services/user.service");

describe("User Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe("getUserController", () => {
    it("should return user data", async () => {
      req = { params: { userId: "123" } };
      (service.getUserData as jest.Mock).mockResolvedValue({ name: "Alice" });

      await getUserController(req as Request, res as Response, next);

      expect(service.getUserData).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ name: "Alice" });
    });

    it("should return 404 if user not found", async () => {
      req = { params: { userId: "123" } };
      (service.getUserData as jest.Mock).mockResolvedValue(null);

      await getUserController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect((next.mock.calls[0][0] as ApiError).status).toBe(404);
    });

    it("should return 400 if userId missing", async () => {
      req = { params: {} };

      await getUserController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect((next.mock.calls[0][0] as ApiError).status).toBe(400);
    });

    it("should handle unexpected errors", async () => {
      req = { params: { userId: "123" } };
      (service.getUserData as jest.Mock).mockRejectedValue(new Error("fail"));

      await getUserController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("updateUserController", () => {
    it("should update and return user data", async () => {
      req = { body: { userId: "123", data: { name: "Bob" } } };
      (service.updateUserData as jest.Mock).mockResolvedValue({ name: "Bob" });

      await updateUserController(req as Request, res as Response, next);

      expect(service.updateUserData).toHaveBeenCalledWith("123", { name: "Bob" });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        name: "Bob",
        message: "User data updated successfully",
      });
    });

    it("should return 400 if body is invalid", async () => {
      req = { body: {} };

      await updateUserController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect((next.mock.calls[0][0] as ApiError).status).toBe(400);
    });

    it("should handle service error", async () => {
      req = { body: { userId: "123", data: { name: "Bob" } } };
      (service.updateUserData as jest.Mock).mockRejectedValue(new Error("DB error"));

      await updateUserController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("getUserIdByEmailController", () => {
    it("should return userId for valid email", async () => {
      req = { params: { email: "test@example.com" } };
      (service.getUserIdByEmail as jest.Mock).mockResolvedValue("abc-123");

      await getUserIdByEmailController(req as Request, res as Response, next);

      expect(service.getUserIdByEmail).toHaveBeenCalledWith("test@example.com");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ userId: "abc-123" });
    });

    it("should return 404 if email not found", async () => {
      req = { params: { email: "none@example.com" } };
      (service.getUserIdByEmail as jest.Mock).mockResolvedValue(null);

      await getUserIdByEmailController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect((next.mock.calls[0][0] as ApiError).status).toBe(404);
    });

    it("should return 400 if email is missing", async () => {
      req = { params: {} };

      await getUserIdByEmailController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect((next.mock.calls[0][0] as ApiError).status).toBe(400);
    });

    it("should handle unexpected service error", async () => {
      req = { params: { email: "err@example.com" } };
      (service.getUserIdByEmail as jest.Mock).mockRejectedValue(new Error("Service crash"));

      await getUserIdByEmailController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
