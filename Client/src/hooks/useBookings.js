import { useState, useEffect } from "react";
import { dummyMyBookingsData } from "../assets/constance/constance";

const useBookings = (showToast) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(dummyMyBookingsData);
  }, []);

  const handleAction = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    const label = newStatus === "confirmed" ? "approved ✓" : "declined";
    showToast(`Booking ${label}`, newStatus === "confirmed" ? "success" : "error");
  };

  const handleCancel = (id) => {
    const booking = bookings.find((b) => b.id === id);
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
    );
    showToast(`${booking?.car?.brand} ${booking?.car?.model} booking cancelled`, "error");
  };

  const pendingCount   = bookings.filter((b) => b.status === "pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  const totalRevenue   = bookings
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .reduce((sum, b) => sum + (b.price || 0), 0);

  return { bookings, handleAction, handleCancel, pendingCount, confirmedCount, totalRevenue };
};

export default useBookings;