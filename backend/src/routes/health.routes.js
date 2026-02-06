import { Router } from "express";
import { successResponse } from "../utils/response.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Server health check APIs
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check backend server health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                     message:
 *                       type: string
 */
router.get("/", (req, res) => {
  return successResponse(res, {
    status: "OK",
    message: "quizflow.ai backend is healthy",
  });
});

export default router;
