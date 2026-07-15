import { useState } from "react";

const PriceCell = ({ car, currency, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(car.pricePerDay);

  const save = () => {
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed > 0) {
      onSave(car.id, parsed);
      setEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex items-center gap-1">
        <span className="text-[12px] text-gray-500">{currency}</span>
        <input
          autoFocus
          type="number"
          value={value}
          min={1}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[72px] px-[7px] py-[3px] text-[13px] font-medium border-[1.5px] border-indigo-500 rounded-md outline-none bg-[#f9f9ff]"
        />
        <button
          onClick={save}
          className="px-2 py-[3px] text-[11px] font-semibold bg-indigo-500 text-white rounded-md border-none cursor-pointer"
        >
          Save
        </button>
        <button
          onClick={() => setEditing(false)}
          className="px-[6px] py-[3px] text-[11px] bg-transparent border border-gray-200 rounded-md cursor-pointer text-gray-500"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      title="Click to edit price"
      className="inline-flex items-center gap-[5px] bg-transparent border-none cursor-pointer px-[6px] py-[3px] rounded-md font-medium text-[13px] text-inherit hover:bg-gray-100 transition-colors"
    >
      {currency} {car.pricePerDay.toFixed(2)}
      <svg
        width="12"
        height="12"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </button>
  );
};

export default PriceCell;