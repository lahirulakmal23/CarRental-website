import { useEffect, useState } from "react";


const Mybooking = ({ user }) => {
  const [booking, setBooking] = useState([]);
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);
  const baseUrl = (import.meta.env.VITE_API_BASE_URL || "/api/v1").replace(/\/$/, "");

  useEffect(() => {
    const controller = new AbortController();
    const loadBookings = async () => {
      try {
        const response = await fetch(`${baseUrl}/bookings/my-bookings?limit=100`, { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }, signal: controller.signal });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "Unable to load bookings.");
        if (!controller.signal.aborted) setBooking(result.data.bookings.map((item) => ({
          ...item, price: item.totalPrice, pickupDate: item.pickupDate?.slice(0, 10), returnDate: item.returnDate?.slice(0, 10), location: item.pickupLocation,
          car: item.car ? { ...item.car, seating_capacity: item.car.seatCapacity } : { brand: "Unavailable", model: "car" },
        })));
      } catch (requestError) {
        if (!controller.signal.aborted) setError(requestError instanceof TypeError || requestError instanceof SyntaxError ? "Unable to connect to the booking server." : requestError.message);
      } finally { if (!controller.signal.aborted) setLoading(false); }
    };
    loadBookings();
    return () => controller.abort();
  }, [baseUrl]);

  const cancelBooking = async (id) => {
    if (user?.role !== "customer" || cancelling) return;
    if (!window.confirm("Cancel this booking?")) return;
    setCancelling(id);
    setError("");
    setMessage("");
    try {
      const response = await fetch(`${baseUrl}/bookings/${id}/cancel`, {
        method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("token")}` }, body: JSON.stringify({}),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to cancel booking.");
      setBooking((previous) => previous.map((item) => item._id === id ? { ...item, status: result.data.status } : item));
      setMessage("Booking cancelled successfully.");
    } catch (requestError) {
      setError(requestError instanceof TypeError || requestError instanceof SyntaxError ? "Unable to connect to the booking server." : requestError.message);
    } finally { setCancelling(null); }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-12">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-sm text-gray-500">
          View and manage your car bookings
        </p>
      </div>

      <p role="status" className="mb-4 text-sm text-green-700">{message}</p>
      {error && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}
      {loading && <p role="status">Loading bookings...</p>}
      {!loading && !error && !booking.length && <p className="py-8 text-center text-gray-500">No bookings yet.</p>}
      {/* BOOKINGS LIST */}
      <div className="space-y-6">
        {booking.map((item) => (
          <div
            key={item._id || item.id}
            className="bg-white border border-gray-300 rounded-lg p-4 sm:p-5 grid grid-cols-[64px_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-5 xl:grid-cols-[128px_minmax(0,1fr)_150px] xl:gap-6"
          >
            {/* IMAGE */}
            <img
              src={item.car.image}
              alt={`${item.car.brand} ${item.car.model}`}
              className="w-16 h-14 sm:w-20 sm:h-16 xl:w-32 xl:h-20 object-cover rounded-lg"
            />

            {/* DETAILS */}
            <div className="contents xl:grid xl:min-w-0 xl:grid-cols-[1.3fr_1fr_1fr_1fr] xl:gap-4 xl:items-start">
              <div className="min-w-0">
                <h2 className="font-semibold text-sm sm:text-lg">{item.car.brand} {item.car.model}</h2>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">{item.car.seating_capacity} seats · {item.car.transmission} · {item.car.year}</p>
<span className={`mt-2 hidden xl:inline-block text-xs px-2 py-0.5 rounded ${item.status === "cancelled" ? "bg-red-100 text-red-700" : item.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-700"}`}>
                  {item.status}
                </span>
              </div>
                <div className="justify-self-end xl:hidden"><span className={`mt-2 inline-block text-xs px-2 py-0.5 rounded ${item.status === "cancelled" ? "bg-red-100 text-red-700" : item.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-700"}`}>
                  {item.status}
                </span></div>
              <div className="col-span-3 grid grid-cols-3 gap-3 xl:contents">
              <div>
                <p className="font-medium text-sm">Booking Date</p>
                <p className="mt-1 text-sm text-gray-500">{item.pickupDate}</p>
              </div>
              <div>
                <p className="font-medium text-sm">Return Date</p>
                <p className="mt-1 text-sm text-gray-500">{item.returnDate}</p>
              </div>
              <div>
                <p className="font-medium text-sm">Location</p>
                <p className="mt-1 text-sm text-gray-500">{item.location || item.car.location || "—"}</p>
              </div>
              </div>
            </div>
            {/* PRICE */}
            <div className="col-span-3 flex items-center justify-between gap-3 xl:col-span-1 xl:block xl:min-w-[150px] xl:text-right">
              <div>
              <p className="text-sm text-gray-500 font-semibold">Total Price</p>
              <p className="text-xl font-bold text-blue-600">
                ${item.price}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Booked on {item.bookedOn || item.createdAt?.slice(0, 10)}
              </p>
              </div>
              {user?.role === "customer" && (item.status === "pending" || item.status === "confirmed") && (
                <button
                  type="button"
                  disabled={!!cancelling}
                  onClick={() => cancelBooking(item._id || item.id)}
                  className="shrink-0 xl:mt-4 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  {cancelling === item._id ? "Cancelling..." : "Cancel Booking"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mybooking;
