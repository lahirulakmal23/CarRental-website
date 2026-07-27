import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/error.middleware.js";
import notFound from "./middlewares/notfound.middleware.js";
import { env } from "./config/env.js";

const app = express();

// core middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// request logging in dev only
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// health check — useful for uptime monitoring / deployment checks
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

// all API routes
app.use("/api/v1", routes);

// 404 handler — must come after routes
app.use(notFound);

// centralized error handler — must be LAST
app.use(errorHandler);

export default app;