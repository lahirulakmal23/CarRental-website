import { Router } from "express";
import authRoutes from "./auth.routes.js";
import bookingRoutes from "./booking.routes.js";
import ownerRoutes from "./owner.routes.js";
import carRoutes from "./car.routes.js";
import adminRoutes from "./admin.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/bookings", bookingRoutes);
router.use("/owner", ownerRoutes);
router.use("/cars", carRoutes);
router.use("/admin", adminRoutes);

// future: router.use("/bookings", bookingRoutes);
// future: router.use("/owner", ownerRoutes);
// future: router.use("/admin", adminRoutes);

export default router;