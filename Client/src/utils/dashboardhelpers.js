export const fmt = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return isNaN(d)
    ? dateStr
    : d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
};

export const calcPercent = (value, total) =>
  total > 0 ? Math.round((value / total) * 100) : 0;