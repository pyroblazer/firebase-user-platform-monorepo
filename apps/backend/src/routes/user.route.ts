import { Router } from "express";
import {
  updateUserController,
  getUserController,
  getUserIdByEmailController
} from "../controller/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router: Router = Router();

router.use(authMiddleware);
router.get("/fetch-user-data/:userId", getUserController);
router.get("/fetch-id-by-email/:email", getUserIdByEmailController);
router.put("/update-user-data", updateUserController);

export { router as userRoutes };
