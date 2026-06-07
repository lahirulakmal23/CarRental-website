import { fmt, daysBetween } from "../../utils/bookingHelpers";

const DetailItem = ({ label, value, highlight }) => (
  <div className="bg-gray-50 rounded-lg px-3 py-[10px]">
    <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-[0.4px] mb-[3px]">{label}</div>
    <div className={`text-[13px] font-semibold ${highlight ? "text-indigo-500" : "text-gray-900"}`}>{value}</div>
  </div>
);

const ApproveModal = ({ booking, onAction, onClose }) => {
  const days = daysBetween(booking.pickupDate, booking.returnDate);

  const details = [
    { label: "Customer",     value: booking.user?.name || booking.userName || "—" },
    { label: "Duration",     value: `${days} day${days !== 1 ? "s" : ""}` },
    { label: "Pick-up",      value: fmt(booking.pickupDate) },
    { label: "Return",       value: fmt(booking.returnDate) },
    { label: "Total Amount", value: `$${booking.price}`, highlight: true },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[420px] shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 m-0">Review Booking Request</h3>
            <button
              onClick={onClose}
              className="bg-transparent border-none cursor-pointer text-gray-400 text-xl leading-none p-[2px] hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          </div>
          <p className="text-[12px] text-gray-400 mt-1">
            Booking #{booking.id?.slice(0, 8) || "—"}
          </p>
        </div>

        {/* Car Info */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex gap-[14px] items-center">
          <img
            src={booking.car.image}
            alt={booking.car.model}
            className="w-20 h-[52px] object-cover rounded-lg border border-gray-200 shrink-0"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div>
            <div className="font-bold text-sm text-gray-900">
              {booking.car.brand} {booking.car.model}
            </div>
            <div className="text-[12px] text-gray-500 mt-[3px]">
              {booking.car.category} · {booking.car.seating_capacity} seats
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="px-6 py-4 grid grid-cols-2 gap-3">
          {details.map((d) => (
            <DetailItem key={d.label} {...d} />
          ))}
        </div>

        {/* Actions */}
        <div className="px-6 pb-[22px] flex gap-[10px]">
          <button
            onClick={onClose}
            className="flex-1 py-[10px] text-[13px] font-medium border border-gray-200 rounded-lg bg-white cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Keep Pending
          </button>
          <button
            onClick={() => onAction(booking.id, "cancelled")}
            className="flex-1 py-[10px] text-[13px] font-semibold border-none rounded-lg bg-red-50 cursor-pointer text-red-700 hover:bg-red-100 transition-colors"
          >
            ✕ Decline
          </button>
          <button
            onClick={() => onAction(booking.id, "confirmed")}
            className="flex-1 py-[10px] text-[13px] font-bold border-none rounded-lg bg-green-600 cursor-pointer text-white hover:bg-green-700 transition-colors"
          >
            ✓ Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;