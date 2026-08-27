import Booking from "../models/booking.model.js";
import Car from "../models/car.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  isCarAvailable,
  calculateTotalPrice,
  assertValidTransition,
} from "../services/booking.services.js";

// @route  POST /api/v1/bookings
// @access Private (customer only)
export const createBooking = asyncHandler(async (req, res) => {
  const { carId, pickupDate, returnDate, pickupLocation } = req.body;
  const idempotencyKey = req.headers["idempotency-key"];

  // idempotency check — if this exact request was already processed, return the original result
  if (idempotencyKey) {
    const existing = await Booking.findOne({ idempotencyKey });
    if (existing) {
      return res
        .status(200)
        .json(new ApiResponse(200, existing, "Booking already exists (idempotent replay)"));
    }
  }

  const car = await Car.findById(carId);
  if (!car) {
    throw new ApiError(404, "Car not found");
  }
  if (!car.isAvailable) {
    throw new ApiError(400, "This car is currently not available for booking");
  }

  const available = await isCarAvailable(carId, pickupDate, returnDate);
  if (!available) {
    throw new ApiError(409, "Car is already booked for the selected dates");
  }

  const totalPrice = calculateTotalPrice(car.pricePerDay, pickupDate, returnDate);

  const booking = await Booking.create({
    customer: req.user.id,
    car: car._id,
    owner: car.owner, // denormalized from the car, never from client input
    pickupDate,
    returnDate,
    pickupLocation,
    totalPrice,
    status: "pending",
    ...(idempotencyKey && { idempotencyKey }),
  });

  res.status(201).json(new ApiResponse(201, booking, "Booking created successfully"));
});

// @route  GET /api/v1/bookings/my-bookings
// @access Private (customer only)
export const getMyBookings = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const filter = { customer: req.user.id };
  if (status) filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);

  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .populate("car", "brand model images pricePerDay")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Booking.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, {
      bookings,
      pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
    })
  );
});

// @route  GET /api/v1/bookings/owner-bookings
// @access Private (owner only)
export const getOwnerBookings = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const filter = { owner: req.user.id };
  if (status) filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);

  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .populate("car", "brand model")
      .populate("customer", "name email phone")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Booking.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, {
      bookings,
      pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
    })
  );
});

// @route  GET /api/v1/bookings/:id
// @access Private (customer who owns it, owner who owns the car, or admin)
export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("car", "brand model images pricePerDay")
    .populate("customer", "name email phone");

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  const isOwner = booking.owner.toString() === req.user.id;
  const isCustomer = booking.customer._id.toString() === req.user.id;
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isCustomer && !isAdmin) {
    throw new ApiError(403, "You do not have permission to view this booking");
  }

  res.status(200).json(new ApiResponse(200, booking));
});

// @route  PATCH /api/v1/bookings/:id/cancel
// @access Private (customer only, must be their own booking)
export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.customer.toString() !== req.user.id) {
    throw new ApiError(403, "You can only cancel your own bookings");
  }

  assertValidTransition(booking.status, "cancelled");

  booking.status = "cancelled";
  booking.cancelledAt = new Date();
  booking.cancelReason = req.body.cancelReason || "Cancelled by customer";
  await booking.save();

  res.status(200).json(new ApiResponse(200, booking, "Booking cancelled successfully"));
});

// @route  PATCH /api/v1/bookings/:id/status
// @access Private (owner only, must own the car on the booking)
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.owner.toString() !== req.user.id) {
    throw new ApiError(403, "You do not have permission to update this booking");
  }

  assertValidTransition(booking.status, status);

  booking.status = status;
  if (status === "cancelled") {
    booking.cancelledAt = new Date();
    booking.cancelReason = req.body.cancelReason || "Cancelled by owner";
  }

  await booking.save();

  res.status(200).json(new ApiResponse(200, booking, `Booking marked as ${status}`));
});