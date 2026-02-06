import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";

const startServer = async () => {
  try {
    await connectDB(env.mongoUri);

    const server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
    });

    // Graceful shutdown
    const shutdown = () => {
      console.log("Shutting down server...");
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
