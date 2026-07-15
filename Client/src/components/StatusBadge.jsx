const StatusBadge = ({ available }) => (
  <span
    className={`inline-flex items-center gap-[5px] px-[10px] py-[3px] rounded-full text-[11px] font-semibold tracking-[0.3px] ${
      available
        ? "bg-[#e8f5e0] text-[#2e7d18]"
        : "bg-[#fdecea] text-[#b91c1c]"
    }`}
  >
    <span
      className={`inline-block w-[6px] h-[6px] rounded-full ${
        available ? "bg-[#22c55e]" : "bg-[#ef4444]"
      }`}
    />
    {available ? "Available" : "Rented Out"}
  </span>
);

export default StatusBadge;