import { useState } from "react";
import useToast from "../../hooks/useToast";
import useBookings from "../../hooks/useBookings";
import useBookingFilters from "../../hooks/useBookingFilters";
import Toast from "../../components/Toast";
import BookingRow from "../../components/bookings/BookingRow";
import ApproveModal from "../../components/bookings/ApproveModal";
import { STATUS } from "../../assets/constance/bookingconfig";

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, color, icon }) => (
  <div className="bg-white border border-gray-100 rounded-xl px-[18px] py-4 flex-1 min-w-[110px] flex flex-col gap-[6px]">
    <div className="flex items-center justify-between">
      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.5px]">{label}</span>
      <span className="text-lg">{icon}</span>
    </div>
    <div className={`text-[24px] font-bold leading-none ${color ?? "text-gray-900"}`}>{value}</div>
  </div>
);

// ─── Status Filter Pills ──────────────────────────────────────────────────────
const FILTER_OPTIONS = ["all", "pending", "confirmed", "cancelled", "completed"];

const StatusFilterPills = ({ statusFilter, setStatusFilter, bookings }) => (
  <div className="flex gap-[6px] flex-wrap">
    {FILTER_OPTIONS.map((s) => {
      const active = statusFilter === s;
      const cfg = STATUS[s];
      return (
        <button
          key={s}
          onClick={() => setStatusFilter(s)}
          className={`px-[13px] py-[5px] text-[12px] font-semibold rounded-full cursor-pointer border transition-all ${
            active && cfg
              ? `${cfg.wrapper}`
              : active
              ? "bg-gray-100 text-gray-700 border-gray-300"
              : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
          }`}
        >
          {s === "all" ? "All" : cfg?.label || s}
          {s !== "all" && (
            <span className={`ml-[5px] rounded-full px-[5px] text-[10px] ${active ? "bg-white/60 text-current" : "bg-gray-200 text-gray-500"}`}>
              {bookings.filter((b) => b.status === s).length}
            </span>
          )}
        </button>
      );
    })}
  </div>
);

// ─── Toolbar ──────────────────────────────────────────────────────────────────
const Toolbar = ({ search, setSearch, statusFilter, setStatusFilter, bookings, filteredCount }) => (
  <div className="flex gap-[10px] mb-4 flex-wrap items-center">
    {/* Search */}
    <div className="relative flex-1 min-w-[180px]">
      <svg
        className="absolute left-[10px] top-1/2 -translate-y-1/2 pointer-events-none"
        width="14" height="14" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        placeholder="Search by car or customer…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full py-2 pl-[30px] pr-8 text-[13px] border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-indigo-500"
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-400 text-base leading-none"
        >
          ×
        </button>
      )}
    </div>

    <StatusFilterPills
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      bookings={bookings}
    />

    <span className="text-[13px] text-gray-400 whitespace-nowrap">
      {filteredCount} booking{filteredCount !== 1 ? "s" : ""}
    </span>
  </div>
);

// ─── Pending Alert Banner ─────────────────────────────────────────────────────
const PendingBanner = ({ count, onShowPending }) => {
  if (!count) return null;
  return (
    <div className="bg-yellow-50 border border-yellow-300 rounded-xl px-4 py-3 mb-5 flex items-center gap-[10px] text-[13px] text-yellow-800">
      <span className="text-lg">⏳</span>
      <span>
        <strong>{count} booking{count !== 1 ? "s" : ""}</strong> waiting for your review.{" "}
        <button
          onClick={onShowPending}
          className="bg-transparent border-none cursor-pointer text-yellow-700 font-bold underline text-[13px] p-0 hover:text-yellow-900"
        >
          Show pending →
        </button>
      </span>
    </div>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ hasFilters, onClear }) => (
  <tr>
    <td colSpan={6} className="py-[52px] text-center text-gray-400">
      <div className="text-[36px] mb-[10px]">📋</div>
      <div className="font-semibold text-[14px] mb-1">No bookings found</div>
      <div className="text-[12px]">
        {hasFilters ? "Try adjusting your filters" : "No bookings yet"}
      </div>
      {hasFilters && (
        <button
          onClick={onClear}
          className="mt-3 px-4 py-[7px] text-[12px] font-semibold bg-gray-100 border-none rounded-lg cursor-pointer text-gray-700 hover:bg-gray-200 transition-colors"
        >
          Clear filters
        </button>
      )}
    </td>
  </tr>
);

// ─── Table Footer ─────────────────────────────────────────────────────────────
const TableFooter = ({ filtered, total, currency }) => {
  const confirmedRevenue = filtered
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .reduce((s, b) => s + (b.price || 0), 0);

  return (
    <div className="px-4 py-[10px] border-t border-gray-100 text-[12px] text-gray-400 flex justify-between items-center bg-gray-50">
      <span>Showing {filtered.length} of {total} bookings</span>
      <span>
        Confirmed revenue:{" "}
        <strong className="text-gray-700">
          {currency}{confirmedRevenue.toLocaleString()}
        </strong>
      </span>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const ManageBooking = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [reviewTarget, setReviewTarget] = useState(null);

  const { toast, showToast } = useToast();
  const { bookings, handleAction, handleCancel, pendingCount, confirmedCount, totalRevenue } = useBookings(showToast);
  const { search, setSearch, statusFilter, setStatusFilter, filtered } = useBookingFilters(bookings);

  const onApproveAction = (id, newStatus) => {
    handleAction(id, newStatus);
    setReviewTarget(null);
  };

  return (
    <div className="px-6 py-8 pb-12 min-h-screen bg-[#f8f9fb] font-inherit">
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.22s ease; }
      `}</style>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-gray-900 m-0">Manage Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review, approve, or decline booking requests from customers.
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <StatCard label="Total Bookings"  value={bookings.length}                                        icon="📋" />
        <StatCard label="Pending Review"  value={pendingCount}   color={pendingCount > 0 ? "text-yellow-700" : "text-gray-900"} icon="⏳" />
        <StatCard label="Confirmed"       value={confirmedCount} color="text-green-700"                  icon="✅" />
        <StatCard label="Revenue"         value={`${currency}${totalRevenue.toLocaleString()}`} color="text-indigo-500" icon="💰" />
      </div>

      {/* Pending Banner */}
      <PendingBanner count={pendingCount} onShowPending={() => setStatusFilter("pending")} />

      {/* Toolbar */}
      <Toolbar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        bookings={bookings}
        filteredCount={filtered.length}
      />

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Car & Customer", "Date Range", "Total", "Payment", "Status", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-[11px] text-left font-semibold text-[11px] text-gray-400 uppercase tracking-[0.5px]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <EmptyState
                hasFilters={!!search || statusFilter !== "all"}
                onClear={() => { setSearch(""); setStatusFilter("all"); }}
              />
            ) : (
              filtered.map((b, i) => (
                <BookingRow
                  key={b.id}
                  booking={b}
                  currency={currency}
                  onReview={setReviewTarget}
                  onCancel={handleCancel}
                  isLast={i === filtered.length - 1}
                />
              ))
            )}
          </tbody>
        </table>

        {filtered.length > 0 && (
          <TableFooter filtered={filtered} total={bookings.length} currency={currency} />
        )}
      </div>

      {/* Approve Modal */}
      {reviewTarget && (
        <ApproveModal
          booking={reviewTarget}
          onAction={onApproveAction}
          onClose={() => setReviewTarget(null)}
        />
      )}

      <Toast message={toast.message} type={toast.type} />
    </div>
  );
};

export default ManageBooking;