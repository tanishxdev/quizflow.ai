import express from "express";
import healthRoutes from "./routes/health.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import quizRoutes from "./routes/quiz.routes.js";

const app = express();

/**
 * Middleware to parse JSON
 */
app.use(express.json());

/**
 * Routes
 */
app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);

/**
 * Global error handler (must be last)
 */
app.use(errorHandler);

export default app;
