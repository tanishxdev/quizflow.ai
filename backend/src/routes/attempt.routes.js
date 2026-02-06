import { Router } from "express";
import {
  startAttempt,
  saveAnswer,
  submitAttempt,
} from "../attempt/attempt.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Attempt
 *   description: Quiz attempt and answer submission APIs
 */

/**
 * @swagger
 * /attempt/quiz/{quizId}/start:
 *   post:
 *     summary: Start a quiz attempt
 *     tags: [Attempt]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz attempt started successfully
 */
router.post("/quiz/:quizId/start", authMiddleware, startAttempt);

/**
 * @swagger
 * /attempt/attempt/{attemptId}/answer:
 *   post:
 *     summary: Save or update an answer for a question
 *     tags: [Attempt]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attemptId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - questionId
 *               - selectedAnswer
 *               - timeSpent
 *             properties:
 *               questionId:
 *                 type: string
 *               selectedAnswer:
 *                 type: string
 *               timeSpent:
 *                 type: number
 *     responses:
 *       200:
 *         description: Answer saved successfully
 */
router.post("/attempt/:attemptId/answer", authMiddleware, saveAnswer);

/**
 * @swagger
 * /attempt/attempt/{attemptId}/submit:
 *   post:
 *     summary: Submit a quiz attempt
 *     tags: [Attempt]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attemptId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz attempt submitted successfully
 */
router.post("/attempt/:attemptId/submit", authMiddleware, submitAttempt);

export default router;
