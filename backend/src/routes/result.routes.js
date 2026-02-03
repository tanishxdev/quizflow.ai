import { Router } from "express";
import { getResult } from "../result/result.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/attempt/:attemptId/result", authMiddleware, getResult);

export default router;
