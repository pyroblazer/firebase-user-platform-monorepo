import * as repository from "../../src/repositories/user.repository";
import {
  getUserData,
  updateUserData,
  getUserIdByEmail
} from "../../src/services/user.service";
import { ApiError } from "../../src/entities/api-error.entity";

jest.mock("../../src/repositories/user.repository");

describe("user.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserData", () => {
    it("should return user data if exists", async () => {
      const mockData = { data: () => ({ name: "Alice" }), exists: true };
      (repository.getUserDocument as jest.Mock).mockResolvedValue(mockData);

      const result = await getUserData("user-id");
      expect(result).toEqual({ name: "Alice" });
    });

    it("should throw error if user not found", async () => {
      (repository.getUserDocument as jest.Mock).mockResolvedValue({ exists: false });

      await expect(getUserData("user-id")).rejects.toThrow(ApiError);
    });
  });

  describe("updateUserData", () => {
    it("should update user and return updated data", async () => {
      (repository.updateUserDocument as jest.Mock).mockResolvedValue(undefined);
      (repository.getUserDocument as jest.Mock).mockResolvedValue({
        exists: true,
        data: () => ({ name: "Updated User" })
      });

      const result = await updateUserData("user-id", { name: "Updated User" });
      expect(result).toEqual({ name: "Updated User" });
    });

    it("should throw error if user not found after update", async () => {
      (repository.updateUserDocument as jest.Mock).mockResolvedValue(undefined);
      (repository.getUserDocument as jest.Mock).mockResolvedValue({ exists: false });

      await expect(updateUserData("user-id", {})).rejects.toThrow(ApiError);
    });
  });

  describe("getUserIdByEmail", () => {
    it("should return user ID if email found", async () => {
      const snapshot = {
        empty: false,
        docs: [{ id: "user-id" }]
      };
      (repository.getUserDocumentByEmail as jest.Mock).mockResolvedValue(snapshot);

      const result = await getUserIdByEmail("test@example.com");
      expect(result).toBe("user-id");
    });

    it("should throw error if email not found", async () => {
      const snapshot = { empty: true };
      (repository.getUserDocumentByEmail as jest.Mock).mockResolvedValue(snapshot);

      await expect(getUserIdByEmail("test@example.com")).rejects.toThrow(ApiError);
    });
  });
});
