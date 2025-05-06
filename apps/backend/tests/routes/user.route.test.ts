import request from "supertest";
import express from "express";
import { userRoutes } from "../../src/routes/user.route";

jest.mock("firebase-admin", () => ({
  auth: () => ({
    verifyIdToken: jest.fn().mockResolvedValue({ uid: "user123" }),
  }),
}));

jest.mock("../../src/services/user.service", () => ({
  updateUserData: jest.fn().mockResolvedValue({ message: "User data updated successfully", name: "Alice" }),
  getUserData: jest.fn().mockResolvedValue({ name: "Alice" }),
  getUserIdByEmail: jest.fn().mockResolvedValue("user123"),
}));

const { updateUserData, getUserData, getUserIdByEmail } = require("../../src/services/user.service");

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

describe("User Routes", () => {
  const token = "mocked-token";

  it("GET /users/fetch-user-data/:userId returns user data", async () => {
    const res = await request(app)
      .get("/users/fetch-user-data/user123")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(getUserData).toHaveBeenCalledWith("user123");
    expect(res.body).toEqual({ name: "Alice" });
  });

  it("GET /users/fetch-id-by-email/:email returns user ID", async () => {
    const res = await request(app)
      .get("/users/fetch-id-by-email/alice@example.com")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(getUserIdByEmail).toHaveBeenCalledWith("alice@example.com");
    expect(res.body).toEqual({ userId: "user123" });
  });

  it("PUT /users/update-user-data updates user and returns new data", async () => {
    const res = await request(app)
      .put("/users/update-user-data")
      .set("Authorization", `Bearer ${token}`)
      .send({ userId: "user123", data: { name: "Alice" } });

    expect(res.statusCode).toBe(200);
    expect(updateUserData).toHaveBeenCalledWith("user123", { name: "Alice" });
    expect(res.body).toEqual({
      message: "User data updated successfully",
      name: "Alice",
    });
  });
});
