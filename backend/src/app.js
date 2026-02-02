import express from "express";
import healthRoutes from "./routes/health.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

/**
 * Middleware to parse JSON
 */
app.use(express.json());

/**
 * Routes
 */
app.use("/health", healthRoutes);

/**
 * Global error handler (must be last)
 */
app.use(errorHandler);

export default app;
