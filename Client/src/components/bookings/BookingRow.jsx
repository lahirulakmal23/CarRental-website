import { FiEye } from 'react-icons/fi';
import { fmt } from "../../utils/bookingHelpers";
import BookingStatusBadge from "./BookingStatusBadge";
import PaymentBadge from "./PaymentBadge";

const BookingRow = ({ booking, currency, onReview, onCancel, isLast }) => {
  const isPending   = booking.status === "pending";
  const isConfirmed = booking.status === "confirmed";

  return (
    <tr
      className="bg-white transition-colors hover:bg-gray-50"
      style={{ borderBottom: isLast ? "none" : "1px solid #f5f5f5" }}
    >
      {/* Car details */}
      <td className="px-4 py-[14px]">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={booking.car.image}
              alt={booking.car.model}
              className="w-[72px] h-[46px] object-cover rounded-lg border border-gray-100 block"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>
          <div>
            <div className="font-semibold text-[13px] text-gray-900">
              {booking.car.brand} {booking.car.model}
            </div>
            <div className="text-[11px] text-gray-400 mt-[2px]">
              {booking.car.seating_capacity} seats · {booking.car.transmission} · {booking.car.year}
            </div>
          </div>
        </div>
      </td>

      {/* Booking Date */}
      <td className="px-4 py-[14px] text-[12px] font-medium text-gray-700 whitespace-nowrap">
        {fmt(booking.pickupDate)}
      </td>

      {/* Return Date */}
      <td className="px-4 py-[14px] text-[12px] text-gray-700 whitespace-nowrap">
        <div className="font-medium">{fmt(booking.returnDate)}</div>
      </td>
      {/* Total */}
      <td className="px-4 py-[14px]">
        <div className="font-bold text-[14px] text-gray-900">
          {currency} {booking.price}
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
            className="inline-flex h-8 w-24 items-center justify-center gap-[5px] px-3 text-[11px] font-semibold bg-transparent text-indigo-600 border border-indigo-300 rounded-lg cursor-pointer whitespace-nowrap hover:text-indigo-800 transition-colors"
          >
            <FiEye aria-hidden="true" className="h-3.5 w-3.5" /> Review
          </button>
        ) : isConfirmed ? (
          <button
            onClick={() => onCancel(booking.id)}
            className="inline-flex h-8 w-24 items-center justify-center px-3 text-[11px] font-semibold bg-red-50 text-red-700 border border-red-300 rounded-lg cursor-pointer whitespace-nowrap hover:bg-red-100 transition-colors"
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


