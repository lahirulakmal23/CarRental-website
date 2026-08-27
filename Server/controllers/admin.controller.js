import User from "../models/user.model.js";
import Car from "../models/car.model.js";
import Booking from "../models/booking.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getPlatformStats } from "../services/adminStats.service.js";

// @route  GET /api/v1/admin/dashboard
// @access Private (admin only)
export const getDashboard = asyncHandler(async (req, res) => {
  const stats = await getPlatformStats();
  res.status(200).json(new ApiResponse(200, stats, "Platform stats fetched successfully"));
});

// @route  GET /api/v1/admin/users
// @access Private (admin only)
export const getAllUsers = asyncHandler(async (req, res) => {
  const { role, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (role) filter.role = role;

  const skip = (Number(page) - 1) * Number(limit);

  const [users, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    User.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, {
      users,
      pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
    })
  );
});

// @route  PATCH /api/v1/admin/users/:id/toggle-status
// @access Private (admin only)
export const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role === "admin") {
    throw new ApiError(400, "Cannot disable an admin account");
  }

  user.isActive = !user.isActive;
  await user.save();

  res.status(200).json(
    new ApiResponse(200, { id: user._id, isActive: user.isActive }, `User ${user.isActive ? "enabled" : "disabled"} successfully`)
  );
});

// @route  GET /api/v1/admin/cars
// @access Private (admin only)
export const getAllCarsAdmin = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const [cars, total] = await Promise.all([
    Car.find({})
      .populate("owner", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Car.countDocuments({}),
  ]);

  res.status(200).json(
    new ApiResponse(200, {
      cars,
      pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
    })
  );
});

// @route  DELETE /api/v1/admin/cars/:id
// @access Private (admin only)
export const deleteCarAdmin = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    throw new ApiError(404, "Car not found");
  }

  const activeBooking = await Booking.findOne({
    car: car._id,
    status: { $in: ["pending", "confirmed", "ongoing"] },
  });

  if (activeBooking) {
    throw new ApiError(400, "Cannot delete a car with active or upcoming bookings");
  }

  await car.deleteOne();
  res.status(200).json(new ApiResponse(200, null, "Car removed by admin"));
});

// @route  GET /api/v1/admin/bookings
// @access Private (admin only)
export const getAllBookingsAdmin = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (status) filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);

  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .populate("car", "brand model")
      .populate("customer", "name email")
      .populate("owner", "name email")
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