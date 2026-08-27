import mongoose from "mongoose";
import Booking from "../models/booking.model.js";
import Car from "../models/car.model.js";

// Returns full dashboard stats for a given owner in a single aggregation.
export const getOwnerStats = async (ownerId) => {
  const ownerObjectId = new mongoose.Types.ObjectId(ownerId);

  const [carStats, bookingStats] = await Promise.all([
    // total cars owned
    Car.countDocuments({ owner: ownerObjectId }),

    // booking counts by status + total income (completed bookings only)
    Booking.aggregate([
      { $match: { owner: ownerObjectId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          revenue: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, "$totalPrice", 0],
            },
          },
        },
      },
    ]),
  ]);

  // bookingStats comes back as an array like:
  // [{ _id: "pending", count: 3, revenue: 0 }, { _id: "completed", count: 5, revenue: 750 }, ...]
  // Reshape it into a flat, predictable object for the frontend.
  const statusCounts = {
    pending: 0,
    confirmed: 0,
    ongoing: 0,
    completed: 0,
    cancelled: 0,
  };
  let totalIncome = 0;
  let totalBookings = 0;

  bookingStats.forEach((entry) => {
    statusCounts[entry._id] = entry.count;
    totalIncome += entry.revenue;
    totalBookings += entry.count;
  });

  return {
    totalCars: carStats,
    totalBookings,
    completedBookings: statusCounts.completed,
    totalIncome,
    bookingsByStatus: statusCounts,
  };
};

// Returns recent bookings for the owner's dashboard activity feed.
export const getOwnerRecentBookings = async (ownerId, limitCount = 5) => {
  return Booking.find({ owner: ownerId })
    .populate("car", "brand model")
    .populate("customer", "name email")
    .sort({ createdAt: -1 })
    .limit(limitCount);
};