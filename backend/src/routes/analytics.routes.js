import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getOverview,
  getSubjectAnalytics,
  getAttemptHistoryController,
  getConsistencyController,
  getTopicClassificationController,
} from "../analytics/analytics.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: User performance analytics APIs
 */

/**
 * @swagger
 * /analytics/overview:
 *   get:
 *     summary: Get overall analytics overview
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Overall analytics snapshot for the authenticated user
 */
router.get("/overview", authMiddleware, getOverview);

/**
 * @swagger
 * /analytics/subject/{subject}:
 *   get:
 *     summary: Get analytics for a specific subject
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subject
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subject-wise analytics data
 */
router.get("/subject/:subject", authMiddleware, getSubjectAnalytics);

/**
 * @swagger
 * /analytics/attempts:
 *   get:
 *     summary: Get quiz attempt history
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of past quiz attempts for the user
 */
router.get("/attempts", authMiddleware, getAttemptHistoryController);

/**
 * @swagger
 * /analytics/consistency:
 *   get:
 *     summary: Get user consistency score
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Consistency score calculated from quiz attempts
 */
router.get("/consistency", authMiddleware, getConsistencyController);

/**
 * @swagger
 * /analytics/topics:
 *   get:
 *     summary: Get weak and strong topic classification
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Topic-wise strength and weakness analysis
 */
router.get("/topics", authMiddleware, getTopicClassificationController);

export default router;
