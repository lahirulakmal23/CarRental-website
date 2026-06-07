import { useState } from "react";
import useToast from "../../hooks/useToast";
import useCars from "../../hooks/useCars";
import useFilters from "../../hooks/useFilters";
import Toast from "../../components/Toast";
import StatusBadge from "../../components/StatusBadge";
import PriceCell from "../../components/PriceCell";

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, color }) => (
  <div className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex-1 min-w-[110px]">
    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.5px] mb-[6px]">
      {label}
    </div>
    <div className={`text-[26px] font-bold leading-none ${color ?? "text-gray-900"}`}>
      {value}
    </div>
    {sub && <div className="text-[11px] text-gray-400 mt-1">{sub}</div>}
  </div>
);

// ─── Confirm Modal ────────────────────────────────────────────────────────────
const ConfirmModal = ({ car, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/35 z-50 flex items-center justify-center">
    <div className="bg-white rounded-2xl px-8 py-7 w-[340px] shadow-2xl text-center">
      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-[14px]">
        <svg width="22" height="22" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </div>
      <h3 className="text-base font-semibold mb-[6px]">Remove this car?</h3>
      <p className="text-[13px] text-gray-500 mb-[22px]">
        <strong>{car.brand} {car.model}</strong> will be permanently removed from your fleet.
      </p>
      <div className="flex gap-[10px]">
        <button
          onClick={onCancel}
          className="flex-1 py-[9px] text-[13px] font-medium rounded-lg border border-gray-200 bg-white cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-[9px] text-[13px] font-semibold rounded-lg border-none bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

// ─── Toolbar ──────────────────────────────────────────────────────────────────
const Toolbar = ({ search, setSearch, statusFilter, setStatusFilter, categoryFilter, setCategoryFilter, categories, totalCars, filteredCount }) => (
  <div className="flex gap-[10px] mb-4 flex-wrap items-center">
    {/* Search */}
    <div className="relative flex-1 min-w-[180px]">
      <svg
        className="absolute left-[10px] top-1/2 -translate-y-1/2 pointer-events-none"
        width="15" height="15" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        placeholder="Search by brand, model or category…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full py-2 pl-8 pr-8 text-[13px] border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-indigo-500"
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

    {/* Status filter */}
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="py-2 px-3 text-[13px] border border-gray-200 rounded-lg bg-white text-gray-700 cursor-pointer focus:outline-indigo-500"
    >
      <option value="all">All Status</option>
      <option value="available">Available</option>
      <option value="rented">Rented Out</option>
    </select>

    {/* Category filter */}
    <select
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
      className="py-2 px-3 text-[13px] border border-gray-200 rounded-lg bg-white text-gray-700 cursor-pointer focus:outline-indigo-500"
    >
      {categories.map((c) => (
        <option key={c} value={c}>
          {c === "all" ? "All Categories" : c}
        </option>
      ))}
    </select>

    {/* Result count */}
    <span className="text-[13px] text-gray-400 whitespace-nowrap">
      {filteredCount} of {totalCars} cars
    </span>
  </div>
);

// ─── Car Table Row ────────────────────────────────────────────────────────────
const CarTableRow = ({ car, currency, isLast, onPriceSave, onToggleStatus, onDelete }) => (
  <tr
    className="bg-white transition-colors hover:bg-gray-50"
    style={{ borderBottom: isLast ? "none" : "1px solid #f5f5f5" }}
  >
    {/* Car Info */}
    <td className="px-4 py-[14px]">
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-[72px] h-[46px] object-cover rounded-lg border border-gray-100 block"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <span
            className={`absolute top-1 right-1 w-2 h-2 rounded-full border-2 border-white ${car.isAvaliable ? "bg-green-400" : "bg-red-400"}`}
          />
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-[13px]">
            {car.brand} {car.model}
          </div>
          <div className="text-[11px] text-gray-400 mt-[2px]">
            {car.seating_capacity} seats · {car.transmission}
            {car.year && ` · ${car.year}`}
          </div>
        </div>
      </div>
    </td>

    {/* Category */}
    <td className="px-4 py-[14px]">
      <span className="inline-block px-[9px] py-[2px] bg-gray-100 rounded-full text-[11px] font-medium text-gray-700">
        {car.category}
      </span>
    </td>

    {/* Price */}
    <td className="px-4 py-[14px]">
      <PriceCell car={car} currency={currency} onSave={onPriceSave} />
    </td>

    {/* Status */}
    <td className="px-4 py-[14px]">
      <StatusBadge available={car.isAvaliable} />
    </td>

    {/* Actions */}
    <td className="px-4 py-[14px]">
      <div className="flex items-center gap-[6px]">
        {/* Toggle availability */}
        <button
          onClick={() => onToggleStatus(car.id)}
          title={car.isAvaliable ? "Mark as Rented Out" : "Mark as Available"}
          className="w-8 h-8 border border-gray-200 rounded-lg bg-white cursor-pointer flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors"
        >
          {car.isAvaliable ? (
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>

        {/* Edit */}
        <button
          title="View details"
          className="w-8 h-8 border border-gray-200 rounded-lg bg-white cursor-pointer flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(car)}
          title="Remove car"
          className="w-8 h-8 border border-gray-200 rounded-lg bg-white cursor-pointer flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>
    </td>
  </tr>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const ManageCar = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { toast, showToast } = useToast();
  const { cars, updatePrice, toggleStatus, deleteCar, availableCount, totalRevenue } = useCars(showToast);
  const { search, setSearch, statusFilter, setStatusFilter, categoryFilter, setCategoryFilter, categories, filtered } = useFilters(cars);

  const handleDelete = () => {
    deleteCar(deleteTarget, () => setDeleteTarget(null));
  };

  return (
    <div className="px-6 py-8 pb-12 min-h-screen bg-[#f8f9fb] font-inherit">
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.2s ease; }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.4; }
      `}</style>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-gray-900 m-0">Manage Cars</h1>
        <p className="text-sm text-gray-500 mt-1">
          Control your fleet — update pricing, availability, and listings.
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <StatCard label="Total Fleet"    value={cars.length}       sub="all cars listed"    />
        <StatCard label="Available"      value={availableCount}    sub="ready to rent"      color="text-green-700" />
        <StatCard label="Rented Out"     value={cars.length - availableCount} sub="currently booked" color="text-red-600" />
        <StatCard
          label="Avg Price / Day"
          value={`${currency}${cars.length ? (totalRevenue / cars.length).toFixed(0) : 0}`}
          sub="across fleet"
          color="text-indigo-500"
        />
      </div>

      {/* Toolbar */}
      <Toolbar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
        totalCars={cars.length}
        filteredCount={filtered.length}
      />

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Car", "Category", "Price / Day", "Status", "Actions"].map((h) => (
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
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-400">
                  <div className="text-[32px] mb-2">🚗</div>
                  <div className="font-medium mb-1">No cars found</div>
                  <div className="text-xs">Try adjusting your filters</div>
                </td>
              </tr>
            ) : (
              filtered.map((car, idx) => (
                <CarTableRow
                  key={car.id}
                  car={car}
                  currency={currency}
                  isLast={idx === filtered.length - 1}
                  onPriceSave={updatePrice}
                  onToggleStatus={toggleStatus}
                  onDelete={setDeleteTarget}
                />
              ))
            )}
          </tbody>
        </table>

        {/* Table Footer */}
        {filtered.length > 0 && (
          <div className="px-4 py-[10px] border-t border-gray-100 text-xs text-gray-400 flex justify-between items-center bg-gray-50">
            <span>Showing {filtered.length} car{filtered.length !== 1 ? "s" : ""}</span>
            <span>
              Fleet avg:{" "}
              <strong className="text-gray-700">
                {currency}{(filtered.reduce((s, c) => s + c.pricePerDay, 0) / filtered.length).toFixed(0)}/day
              </strong>
            </span>
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {deleteTarget && (
        <ConfirmModal
          car={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Toast */}
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
};

export default ManageCar;