import { Router } from "express";
import { successResponse } from "../utils/response.js";

const router = Router();

/**
 * GET /health
 * Used to check server status
 */
router.get("/", (req, res) => {
  return successResponse(res, {
    status: "OK",
    message: "quizflow.ai backend is healthy",
  });
});

export default router;
