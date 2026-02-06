import { Router } from "express";
import { generateQuiz } from "../quiz/quiz.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Quiz
 *   description: Quiz generation and management APIs
 */

/**
 * @swagger
 * /quiz/generate:
 *   post:
 *     summary: Generate a quiz based on subject and topic
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - topic
 *               - totalQuestions
 *             properties:
 *               subject:
 *                 type: string
 *                 example: "JavaScript"
 *               topic:
 *                 type: string
 *                 example: "Closures"
 *               totalQuestions:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Quiz generated successfully
 */
router.post("/generate", authMiddleware, generateQuiz);

export default router;
