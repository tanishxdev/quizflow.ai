import { Router } from "express";
import { getResult } from "../result/result.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Result
 *   description: Quiz result and performance analysis APIs
 */

/**
 * @swagger
 * /result/attempt/{attemptId}/result:
 *   get:
 *     summary: Get quiz result for a submitted attempt
 *     tags: [Result]
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
 *         description: Quiz result with performance analysis
 */
router.get("/attempt/:attemptId/result", authMiddleware, getResult);

export default router;
