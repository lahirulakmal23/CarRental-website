import { fmt, daysBetween } from "../../utils/bookingHelpers";
import BookingStatusBadge from "./BookingStatusBadge";
import PaymentBadge from "./PaymentBadge";

const BookingRow = ({ booking, currency, onReview, onCancel, isLast }) => {
  const days = daysBetween(booking.pickupDate, booking.returnDate);
  const isPending   = booking.status === "pending";
  const isConfirmed = booking.status === "confirmed";

  return (
    <tr
      className="bg-white transition-colors hover:bg-gray-50"
      style={{ borderBottom: isLast ? "none" : "1px solid #f5f5f5" }}
    >
      {/* Car & Customer */}
      <td className="px-4 py-[14px]">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={booking.car.image}
              alt={booking.car.model}
              className="w-[72px] h-[46px] object-cover rounded-lg border border-gray-100 block"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            {isPending && (
              <span className="absolute -top-[5px] -right-[5px] w-[14px] h-[14px] bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">
                !
              </span>
            )}
          </div>
          <div>
            <div className="font-semibold text-[13px] text-gray-900">
              {booking.car.brand} {booking.car.model}
            </div>
            <div className="text-[11px] text-gray-400 mt-[2px]">
              {booking.car.category} · {booking.car.seating_capacity} seats
            </div>
            <div className="text-[11px] text-gray-500 mt-[2px]">
              👤 {booking.user?.name || booking.userName || "Customer"}
            </div>
          </div>
        </div>
      </td>

      {/* Date Range */}
      <td className="px-4 py-[14px] text-[12px] text-gray-700">
        <div className="font-medium">{fmt(booking.pickupDate)}</div>
        <div className="text-gray-400 text-[11px] my-[2px]">→</div>
        <div className="font-medium">{fmt(booking.returnDate)}</div>
        <span className="mt-1 inline-block bg-gray-100 rounded-full px-[7px] py-[1px] text-[10px] font-semibold text-gray-500">
          {days}d
        </span>
      </td>

      {/* Total */}
      <td className="px-4 py-[14px]">
        <div className="font-bold text-[14px] text-gray-900">
          {currency} {booking.price}
        </div>
        <div className="text-[11px] text-gray-400 mt-[2px]">
          {currency} {(booking.price / days).toFixed(0)}/day
        </div>
      </td>

      {/* Payment — only confirmed status shown */}
      <td className="px-4 py-[14px]">
        <PaymentBadge status="confirmed" />
      </td>

      {/* Booking Status */}
      <td className="px-4 py-[14px]">
        <BookingStatusBadge status={booking.status} />
      </td>

      {/* Actions */}
      <td className="px-4 py-[14px]">
        {isPending ? (
          <button
            onClick={() => onReview(booking)}
            className="flex items-center gap-[5px] px-3 py-[6px] text-[11px] font-bold bg-indigo-500 text-white border-none rounded-lg cursor-pointer whitespace-nowrap hover:bg-indigo-600 transition-colors"
          >
            <span className="text-[13px]">⚡</span> Review
          </button>
        ) : isConfirmed ? (
          <button
            onClick={() => onCancel(booking.id)}
            className="px-3 py-[6px] text-[11px] font-semibold bg-red-50 text-red-700 border border-red-300 rounded-lg cursor-pointer whitespace-nowrap hover:bg-red-100 transition-colors"
          >
            Cancel
          </button>
        ) : (
          <span className="text-[11px] text-gray-400">—</span>
        )}
      </td>
    </tr>
  );
};

export default BookingRow;