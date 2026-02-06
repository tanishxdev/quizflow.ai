import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import attemptRoutes from "./routes/attempt.routes.js";
import resultRoutes from "./routes/result.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

/**
 * ===============================
 * GLOBAL SECURITY MIDDLEWARES
 * ===============================
 */

app.use(helmet());

app.use(
  express.json({
    limit: "1mb",
  }),
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

/**
 * ===============================
 * SWAGGER UI
 * ===============================
 * MUST be before routes
 */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * ===============================
 * ROUTES
 * ===============================
 */
app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);
app.use("/attempt", attemptRoutes);
app.use("/result", resultRoutes);
app.use("/analytics", analyticsRoutes);

/**
 * ===============================
 * GLOBAL ERROR HANDLER
 * ===============================
 */
app.use(errorHandler);

export default app;
