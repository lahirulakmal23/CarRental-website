import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyCarData, assets } from "../assets/constance/constance";

const CarDetails = ({ user, setShowLogin, checking }) => {
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const carDetails = dummyCarData.find((car) => String(car._id) === id);
  const days = Math.ceil((new Date(returnDate) - new Date(pickupDate)) / 86400000);
  const totalPrice = days > 0 ? days * (carDetails?.pricePerDay || 0) : 0;

  const bookCar = async (event) => {
    event.preventDefault();
    if (checking || submitting) return;
    if (!user) { setShowLogin("login"); return; }
    if (user.role !== "customer") return;
    if (!pickupDate || !returnDate || days <= 0) { setBookingError("Select a return date after your pickup date."); return; }
    setSubmitting(true);
    setBookingError("");
    try {
      const baseUrl = (import.meta.env.VITE_API_BASE_URL || "/api/v1").replace(/\/$/, "");
      const response = await fetch(`${baseUrl}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        body: JSON.stringify({ carId: id, pickupDate, returnDate, pickupLocation: carDetails.location }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to book this car.");
      navigate("/my-bookings");
    } catch (error) {
      setBookingError(error instanceof TypeError || error instanceof SyntaxError ? "Unable to connect to the booking server. Please try again." : error.message);
    } finally { setSubmitting(false); }
  };
  // ✅ Loading guard
  if (!carDetails) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading car details...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
      {/* Back button */}

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-600 mb-6 hover:text-black"
      >
        <img src={assets.arrow_icon} alt="back" className="w-4 rotate-180" />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          <img
            src={carDetails.image}
            alt={carDetails.name}
            className="w-full h-[220px] sm:h-[320px] md:h-[420px] object-cover rounded-xl mb-6"
          />

          <h1 className="text-2xl sm:text-3xl font-bold">
            {carDetails.brand} {carDetails.model}
          </h1>
          <p className="text-gray-500 mb-6">
            {carDetails.category} · {carDetails.year}
          </p>

          <hr className="border my-6 border-gray-300" />
          {/* Features */}

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                icon: assets.users_icon,
                label: `${carDetails.seating_capacity} Seats`,
              },
              { icon: assets.fuel_icon, label: carDetails.fuel_type },
              { icon: assets.car_icon, label: carDetails.transmission },
              { icon: assets.location_icon, label: carDetails.location },
            ].map((icon, label) => (
              <div
                key={label}
                className="flex  flex-col items-center text-sm  bg-slate-200 rounded-lg p-2 "
              >
                <img src={icon.icon} alt={label} className="h-4 mb-2" />
                <span>{icon.label}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-600 leading-relaxed">
            {carDetails.description}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-fit sticky top-24">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-2xl font-bold">${carDetails.pricePerDay}</h3>
            <span className="text-gray-500 text-sm">per day</span>
          </div>

          <hr className="mb-4" />

          <form onSubmit={bookCar} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Pickup Date</label>
              <input
                type="date"
                required
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Return Date</label>
              <input
                type="date"
                required
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {bookingError && <p role="alert" className="text-sm text-red-600">{bookingError}</p>}
            {/* Total price */}
            {totalPrice > 0 && (
              <div className="flex justify-between font-semibold text-gray-700 mt-8 mb-6">
                <span>Total Price</span>
                <span>${totalPrice}</span>
              </div>
            )}

            <button
              disabled={checking || submitting || (!!user && user.role !== "customer")}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checking ? "Checking account..." : submitting ? "Booking..." : user && user.role !== "customer" ? "Customer accounts only" : !user ? "Log In to Book" : "Book Now"}
            </button>

            <p className="text-center text-xs text-gray-500">
              No credit card required to reserve
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
