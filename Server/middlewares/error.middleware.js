import { env } from "../config/env.js";

// Converts known/unknown errors into a consistent response shape.
// Must be registered LAST in app.js, after all routes.
const errorHandler = (err, req, res, next) => {
  let error = err;
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || [];

  // Mongoose bad ObjectId (e.g. /api/v1/cars/invalid-id)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose duplicate key (e.g. email already exists, idempotencyKey reused)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  // Mongoose schema validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    errors = Object.values(err.errors).map((val) => val.message);
    message = "Validation failed";
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;