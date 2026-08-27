import fs from "fs";
import Car from "../models/car.model.js";
import User from "../models/user.model.js";
import imageKit from "../config/imageKit.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getOwnerStats, getOwnerRecentBookings } from "../services/stats.services.js";


// @route  PATCH /api/v1/owner/change-role
// @access Private (any logged-in user)
export const changeRoleToOwner = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role === "owner") {
    throw new ApiError(400, "You are already an owner");
  }

  user.role = "owner";
  await user.save();

  res.status(200).json(new ApiResponse(200, { role: user.role }, "Role updated to owner"));
});

// @route  POST /api/v1/owner/add-car
// @access Private (owner only)
export const addCar = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const imageFile = req.file;

  if (!imageFile) {
    throw new ApiError(400, "Car image is required");
  }

  const parseCarData = (body) => {
    if (body.carData) {
      if (typeof body.carData === "string") {
        try {
          return JSON.parse(body.carData);
        } catch (err) {
          throw new ApiError(400, "Invalid car data format");
        }
      }
      return body.carData;
    }
    return body;
  };

  const car = parseCarData(req.body);

  // upload image to ImageKit
  const fileBuffer = fs.readFileSync(imageFile.path);

  const response = await imageKit.upload({
    file: fileBuffer,
    fileName: imageFile.originalname,
    folder: "/cars",
  });

  // clean up local temp file now that it's uploaded — don't let it sit on disk
  fs.unlink(imageFile.path, (err) => {
    if (err) console.error("Failed to delete temp file:", err.message);
  });

  const optimizedImageUrl = imageKit.url({
    path: response.filePath,
    transformation: [{ width: "1280" }, { quality: "auto" }, { format: "webp" }],
  });

  const newCar = await Car.create({
    owner: userId,
    brand: car.brand,
    model: car.model,
    year: car.year,
    category: car.category,
    pricePerDay: car.pricePerDay ?? car.pricePerday,
    location: car.location,
    description: car.description,
    seatCapacity: car.seatCapacity ?? car.seating_capacity ?? car.seats,
    transmission: car.transmission ?? car.transmision,
    fuelType: car.fuelType ?? car.fule_type,
    image: optimizedImageUrl,
  });

  res.status(201).json(new ApiResponse(201, newCar, "Car added successfully"));
});

// @route  GET /api/v1/owner/dashboard
// @access Private (owner only)
export const getDashboard = asyncHandler(async (req, res) => {
  const [stats, recentBookings] = await Promise.all([
    getOwnerStats(req.user.id),
    getOwnerRecentBookings(req.user.id),
  ]);

  res.status(200).json(
    new ApiResponse(200, { ...stats, recentBookings }, "Dashboard data fetched successfully")
  );
});