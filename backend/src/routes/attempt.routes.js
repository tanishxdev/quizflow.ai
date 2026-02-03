import { Router } from "express";
import {
  startAttempt,
  saveAnswer,
  submitAttempt,
} from "../attempt/attempt.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/quiz/:quizId/start", authMiddleware, startAttempt);
router.post("/attempt/:attemptId/answer", authMiddleware, saveAnswer);
router.post("/attempt/:attemptId/submit", authMiddleware, submitAttempt);

export default router;
