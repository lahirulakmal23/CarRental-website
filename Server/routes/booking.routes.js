import { Router } from "express";
import {
  createBooking,
  getMyBookings,
  getOwnerBookings,
  getBookingById,
  cancelBooking,
  updateBookingStatus,
} from "../controllers/booking.controller.js";
import {
  createBookingValidator,
  bookingIdValidator,
  updateStatusValidator,
  cancelBookingValidator,
} from "../validators/booking.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/",
  protect,
  authorize("customer"),
  createBookingValidator,
  validate,
  createBooking
);

router.get("/my-bookings", protect, authorize("customer"), getMyBookings);
router.get("/owner-bookings", protect, authorize("owner"), getOwnerBookings);
router.get("/:id", protect, bookingIdValidator, validate, getBookingById);

router.patch(
  "/:id/cancel",
  protect,
  authorize("customer"),
  cancelBookingValidator,
  validate,
  cancelBooking
);

router.patch(
  "/:id/status",
  protect,
  authorize("owner"),
  updateStatusValidator,
  validate,
  updateBookingStatus
);

export default router;