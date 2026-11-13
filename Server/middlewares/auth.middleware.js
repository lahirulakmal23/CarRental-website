import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { env } from "../config/env.js";

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Not authorized, no token provided");
  }
  let decoded;
  try {
    decoded = jwt.verify(authHeader.slice(7), env.JWT_SECRET);
  } catch {
    throw new ApiError(401, "Not authorized, token invalid or expired");
  }
  if (!decoded || typeof decoded !== "object" || !/^[a-f\d]{24}$/i.test(decoded.id || "")) {
    throw new ApiError(401, "Not authorized, token invalid");
  }
  const user = await User.findById(decoded.id).select("role isActive");
  if (!user || !user.isActive) {
    throw new ApiError(401, "Account unavailable or disabled");
  }
  req.user = { id: user._id.toString(), role: user.role };
  next();
});