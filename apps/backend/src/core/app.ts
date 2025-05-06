import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import { userRoutes } from "../routes/user.route";
import { ApiError } from "../entities/api-error.entity";

const app: Application = express();

app.use(cors());

app.use("/user", userRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json("Hello World");
});

app.use("*", (_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});

export default app;
