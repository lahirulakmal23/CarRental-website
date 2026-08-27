import Booking from "../models/booking.model.js";
import ApiError from "../utils/ApiError.js";

// Checks whether a car has any overlapping active booking for the given date range.
// excludeBookingId is used when re-checking during status updates on an existing booking.
export const isCarAvailable = async (carId, pickupDate, returnDate, excludeBookingId = null) => {
  const query = {
    car: carId,
    status: { $in: ["pending", "confirmed", "ongoing"] }, // cancelled/completed don't block
    pickupDate: { $lt: returnDate },
    returnDate: { $gt: pickupDate },
  };

  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }

  const overlapping = await Booking.findOne(query);
  return !overlapping;
};

// Calculates total price based on car's daily rate and duration.
export const calculateTotalPrice = (pricePerDay, pickupDate, returnDate) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const days = Math.ceil((new Date(returnDate) - new Date(pickupDate)) / oneDay);
  return Math.max(days, 1) * pricePerDay; // minimum 1 day charge
};

// Defines the only legal status transitions — prevents arbitrary status jumps.
const ALLOWED_TRANSITIONS = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["ongoing", "cancelled"],
  ongoing: ["completed"],
  completed: [], // terminal state
  cancelled: [], // terminal state
};

export const assertValidTransition = (currentStatus, newStatus) => {
  const allowed = ALLOWED_TRANSITIONS[currentStatus] || [];
  if (!allowed.includes(newStatus)) {
    throw new ApiError(
      400,
      `Cannot change booking status from '${currentStatus}' to '${newStatus}'`
    );
  }
};