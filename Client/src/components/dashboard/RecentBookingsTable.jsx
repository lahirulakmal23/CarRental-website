import { fmt } from "../../utils/dashboardHelpers";
import { BOOKING_STATUS_MAP } from "../../assets/constance/dashboardConfig";
import SectionCard from "./SectionCard";

const TABLE_HEADERS = ["Car", "Pickup", "Return", "Location", "Price", "Status"];

const StatusBadge = ({ status }) => {
  const cfg = BOOKING_STATUS_MAP[status] ?? BOOKING_STATUS_MAP.Pending;
  return (
    <span className={`px-[9px] py-[3px] rounded-full text-[10px] font-bold whitespace-nowrap ${cfg.bg} ${cfg.color}`}>
      {status}
    </span>
  );
};

const BookingRow = ({ item, currency, isLast }) => (
  <div
    className={`grid items-center px-[22px] py-[13px] transition-colors hover:bg-gray-50 ${
      !isLast ? "border-b border-gray-100" : ""
    }`}
    style={{ gridTemplateColumns: "2fr 1fr 1fr 1.2fr 0.7fr 0.8fr" }}
  >
    <div className="flex items-center gap-[10px]">
      <div className="w-[34px] h-[34px] rounded-lg bg-indigo-50 flex items-center justify-center text-base shrink-0">
        🚗
      </div>
      <div>
        <div className="font-semibold text-[12px] text-gray-900">
          {item.car?.brand} {item.car?.model}
        </div>
        <div className="text-[10px] text-gray-400">#{item.bookingId || "—"}</div>
      </div>
    </div>

    <span className="text-[12px] text-gray-700">{fmt(item.pickupDate)}</span>
    <span className="text-[12px] text-gray-700">{fmt(item.returnDate)}</span>
    <span className="text-[11px] text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
      {item.location || "—"}
    </span>
    <span className="text-[12px] font-semibold text-gray-900 text-right">
      {currency}{item.price}
    </span>
    <div className="text-right">
      <StatusBadge status={item.status} />
    </div>
  </div>
);

const RecentBookingsTable = ({ bookings, currency }) => (
  <SectionCard
    title="Recent Bookings"
    sub="Latest customer activity"
    action={
      <span className="text-[11px] font-semibold text-indigo-500 cursor-pointer px-[10px] py-1 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors">
        View all →
      </span>
    }
  >
    <div className="pb-1">
      <div
        className="grid px-[22px] py-[10px] bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-[0.5px]"
        style={{ gridTemplateColumns: "2fr 1fr 1fr 1.2fr 0.7fr 0.8fr" }}
      >
        {TABLE_HEADERS.map((h, i) => (
          <span key={h} className={i >= 4 ? "text-right" : ""}>{h}</span>
        ))}
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-[13px]">No recent bookings</div>
      ) : (
        bookings.map((item, i) => (
          <BookingRow
            key={i}
            item={item}
            currency={currency}
            isLast={i === bookings.length - 1}
          />
        ))
      )}
    </div>
  </SectionCard>
);

export default RecentBookingsTable;