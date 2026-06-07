import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MONTHLY_DATA, CHART_TABS } from "../../assets/constance/dashboardConfig";
import SectionCard from "./SectionCard";

const ChartTooltip = ({ active, payload, label, prefix = "" }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 rounded-lg px-3 py-2 text-[12px] text-white shadow-xl">
      <div className="font-semibold mb-1 text-slate-400">{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ color: p.color || "#fff" }}>
          {p.name}: <strong>{prefix}{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

const CHART_SUMMARY = {
  bookings: { avg: "29" },
  revenue:  { avg: null }, // computed below
};

const MonthlyChart = ({ currency }) => {
  const [chartTab, setChartTab] = useState("bookings");

  const avgRevenue = `${currency}${(
    MONTHLY_DATA.reduce((s, d) => s + d.revenue, 0) / MONTHLY_DATA.length
  ).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  const avg = chartTab === "bookings" ? CHART_SUMMARY.bookings.avg : avgRevenue;

  return (
    <SectionCard
      title="Monthly Overview"
      sub="Bookings & revenue trend"
      action={
        <div className="flex gap-[5px]">
          {CHART_TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setChartTab(key)}
              className={`px-[10px] py-1 text-[10px] font-bold rounded-full border-none cursor-pointer transition-all ${
                chartTab === key
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      }
    >
      <div className="px-3 pt-4 pb-3">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={MONTHLY_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis                 tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip prefix={chartTab === "revenue" ? currency : ""} />} />
            <Area
              type="monotone"
              dataKey={chartTab}
              name={chartTab === "bookings" ? "Bookings" : "Revenue"}
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#colorGrad)"
              dot={{ r: 3, fill: "#6366f1", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-2 mt-3 px-1">
          {[
            { label: "Best Month", value: "December" },
            { label: "Avg / Month", value: avg },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-lg px-[10px] py-2 text-center">
              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-[0.4px]">{label}</div>
              <div className="text-[13px] font-bold text-gray-900 mt-[2px]">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
};

export default MonthlyChart;