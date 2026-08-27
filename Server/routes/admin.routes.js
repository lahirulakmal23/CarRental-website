import express from "express";
import {
  getDashboard,
  getAllUsers,
  toggleUserStatus,
  getAllCarsAdmin,
  deleteCarAdmin,
  getAllBookingsAdmin,
} from "../controllers/admin.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const adminRoutes = express.Router();

// every route below requires admin role — apply once at the router level
adminRoutes.use(protect, authorize("admin"));

adminRoutes.get("/dashboard", getDashboard);
adminRoutes.get("/users", getAllUsers);
adminRoutes.patch("/users/:id/toggle-status", toggleUserStatus);
adminRoutes.get("/cars", getAllCarsAdmin);
adminRoutes.delete("/cars/:id", deleteCarAdmin);
adminRoutes.get("/bookings", getAllBookingsAdmin);

export default adminRoutes;