import { body, param } from "express-validator";

export const createBookingValidator = [
  body("carId").isMongoId().withMessage("Valid car ID is required"),
  body("pickupDate").isISO8601().withMessage("Valid pickup date is required"),
  body("returnDate").isISO8601().withMessage("Valid return date is required"),
  body("pickupLocation").trim().notEmpty().withMessage("Pickup location is required"),
  body().custom((body) => {
    if (new Date(body.pickupDate) < new Date().setHours(0, 0, 0, 0)) {
      throw new Error("Pickup date cannot be in the past");
    }
    if (new Date(body.returnDate) <= new Date(body.pickupDate)) {
      throw new Error("Return date must be after pickup date");
    }
    return true;
  }),
];

export const bookingIdValidator = [
  param("id").isMongoId().withMessage("Invalid booking ID"),
];

export const updateStatusValidator = [
  param("id").isMongoId().withMessage("Invalid booking ID"),
  body("status")
    .isIn(["confirmed", "ongoing", "completed", "cancelled"])
    .withMessage("Invalid status value"),
];

export const cancelBookingValidator = [
  param("id").isMongoId().withMessage("Invalid booking ID"),
  body("cancelReason").optional().trim(),
];