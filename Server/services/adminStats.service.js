import mongoose from "mongoose";
import User from "../models/user.model.js";
import Car from "../models/car.model.js";
import Booking from "../models/booking.model.js";

export const getPlatformStats = async () => {
  const [totalCustomers, totalOwners, totalCars, bookingStats] = await Promise.all([
    User.countDocuments({ role: "customer" }),
    User.countDocuments({ role: "owner" }),
    Car.countDocuments({}),
    Booking.aggregate([
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

  const statusCounts = {
    pending: 0,
    confirmed: 0,
    ongoing: 0,
    completed: 0,
    cancelled: 0,
  };
  let totalRevenue = 0;
  let totalBookings = 0;

  bookingStats.forEach((entry) => {
    statusCounts[entry._id] = entry.count;
    totalRevenue += entry.revenue;
    totalBookings += entry.count;
  });

  return {
    totalUsers: totalCustomers + totalOwners,
    totalCustomers,
    totalOwners,
    totalCars,
    totalBookings,
    completedBookings: statusCounts.completed,
    totalRevenue,
    bookingsByStatus: statusCounts,
  };
};