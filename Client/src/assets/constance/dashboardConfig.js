export const MONTHLY_DATA = [
  { month: "Jan", bookings: 12, revenue: 1800 },
  { month: "Feb", bookings: 19, revenue: 2600 },
  { month: "Mar", bookings: 15, revenue: 2200 },
  { month: "Apr", bookings: 27, revenue: 3800 },
  { month: "May", bookings: 22, revenue: 3100 },
  { month: "Jun", bookings: 31, revenue: 4500 },
  { month: "Jul", bookings: 38, revenue: 5200 },
  { month: "Aug", bookings: 34, revenue: 4800 },
  { month: "Sep", bookings: 29, revenue: 4100 },
  { month: "Oct", bookings: 41, revenue: 5800 },
  { month: "Nov", bookings: 35, revenue: 4900 },
  { month: "Dec", bookings: 44, revenue: 6200 },
];
import { FaCar } from "react-icons/fa";

export const BOOKING_STATUS_MAP = {
  Confirmed: { bg: "bg-blue-50",   color: "text-blue-700" },
  Completed: { bg: "bg-green-50",  color: "text-green-700" },
  Pending:   { bg: "bg-yellow-50", color: "text-yellow-700" },
  Cancelled: { bg: "bg-red-50",    color: "text-red-700" },
};

export const CHART_TABS = [
  { key: "bookings", label: "Bookings" },
  { key: "revenue",  label: "Revenue"  },
];

export const QUICK_ACTIONS = [
  { label: "Add New Car",     icon: "🚗", accent: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "View Bookings",   icon: "📋", accent: "text-sky-600",    bg: "bg-sky-50"    },
  { label: "Pending Reviews", icon: "⏳", accent: "text-yellow-600", bg: "bg-yellow-50" },
  { label: "Download Report", icon: "⬇",  accent: "text-green-600",  bg: "bg-green-50"  },
];

export const buildStatCards = (data, currency) => [
  { title: "Total Cars",     value: data.totalCars,      sub: "in your fleet",      icon: "🚗", trend: 0    },
  { title: "Total Bookings", value: data.totalBooking,   sub: "all time",            icon: "📋", trend: 12   },
  { title: "Pending",        value: data.pendingBooking, sub: "awaiting review",    icon: "⏳", trend: null },
  { title: "Completed",      value: data.completeBooking,sub: "successful rentals",  icon: "✅", trend: 8    },
  {
    title: "Total Earnings",
    value: `${currency}${(data.totalEarning || data.monthlyRevenue || 0).toLocaleString()}`,
    sub: "confirmed bookings",
    icon: "💰",
    trend: 18,
  },
];

export const buildFleetRows = (data) => [
  { label: "Available",      value: data.totalCars - (data.pendingBooking || 0), total: data.totalCars,    color: "#22c55e" },
  { label: "Rented Out",     value: data.pendingBooking || 0,                    total: data.totalCars,    color: "#6366f1" },
  { label: "Completed Trips",value: data.completeBooking || 0,                   total: data.totalBooking || 1, color: "#f59e0b" },
];