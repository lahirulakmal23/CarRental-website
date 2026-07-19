import Car from "../models/car.model.js";
import Booking from "../models/booking.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// @route  POST /api/cars
// @access Private (owner only)
export const addCar = asyncHandler(async (req, res) => {
  console.log("req.file:", req.file);
  console.log("req.body:", req.body);

  const userId = req.user.id;
  const imageFile = req.file;
  
  const {
    brand,
    model,
    year,
    category,
    pricePerDay,
    location,
    images,
    transmission,
    fuelType,
    seats,
  } = req.body;

  const car = await Car.create({
    owner: req.user.id, // taken from JWT, never trust client-supplied owner id
    brand,
    model,
    year,
    category,
    pricePerDay,
    location,
    images,
    transmission,
    fuelType,
    seats,
  });

  res.status(201).json(new ApiResponse(201, car, "Car added successfully"));
});

// @route  GET /api/cars
// @access Public — customers browsing/searching available cars
export const getAllCars = asyncHandler(async (req, res) => {
  const { location, category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

  const filter = { isAvailable: true };
  if (location) filter.location = { $regex: location, $options: "i" };
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.pricePerDay = {};
    if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
    if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [cars, total] = await Promise.all([
    Car.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Car.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, {
      cars,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      },
    })
  );
});

// @route  GET /api/cars/:id
// @access Public
export const getCarById = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id).populate("owner", "name email phone");
  if (!car) {
    throw new ApiError(404, "Car not found");
  }
  res.status(200).json(new ApiResponse(200, car));
});

// @route  GET /api/cars/my-cars
// @access Private (owner only)
export const getMyCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({ owner: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, cars));
});

// @route  PATCH /api/cars/:id
// @access Private (owner only, must own the car)
export const updateCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    throw new ApiError(404, "Car not found");
  }

  // ownership check — an owner can only edit their own cars
  if (car.owner.toString() !== req.user.id) {
    throw new ApiError(403, "You do not have permission to update this car");
  }

  // whitelist updatable fields — never spread req.body directly onto a document
  const allowedFields = [
    "brand",
    "model",
    "year",
    "category",
    "pricePerDay",
    "location",
    "images",
    "transmission",
    "fuelType",
    "seats",
    "isAvailable",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      car[field] = req.body[field];
    }
  });

  await car.save();

  res.status(200).json(new ApiResponse(200, car, "Car updated successfully"));
});

// @route  DELETE /api/cars/:id
// @access Private (owner only, must own the car)
export const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    throw new ApiError(404, "Car not found");
  }

  if (car.owner.toString() !== req.user.id) {
    throw new ApiError(403, "You do not have permission to delete this car");
  }

  // block deletion if car has active/future bookings — protects booking history integrity
  const activeBooking = await Booking.findOne({
    car: car._id,
    status: { $in: ["pending", "confirmed", "ongoing"] },
  });

  if (activeBooking) {
    throw new ApiError(
      400,
      "Cannot delete a car with active or upcoming bookings. Mark it unavailable instead."
    );
  }

  await car.deleteOne();

  res.status(200).json(new ApiResponse(200, null, "Car deleted successfully"));
});