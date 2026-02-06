export const errorHandler = (err, req, res, next) => {
  // Log full error only in development
  if (process.env.NODE_ENV !== "production") {
    console.error("ERROR:", err);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
