import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getOverview,
  getSubjectAnalytics
} from "../analytics/analytics.controller.js";

const router = Router();

router.get("/overview", authMiddleware, getOverview);
router.get("/subject/:subject", authMiddleware, getSubjectAnalytics);

export default router;
