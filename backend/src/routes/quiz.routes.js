import { Router } from "express";
import { generateQuiz } from "../quiz/quiz.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/generate", authMiddleware, generateQuiz);

export default router;
