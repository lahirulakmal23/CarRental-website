import { useEffect, useState } from "react";
import { dummyDashboardData }  from "../../assets/constance/constance";
import { buildStatCards, buildFleetRows, QUICK_ACTIONS } from "../../assets/constance/dashboardConfig";
import { calcPercent } from "../../utils/dashboardHelpers";

import RecentBookingsTable from "../../components/dashboard/RecentBookingsTable";
import MonthlyChart        from "../../components/dashboard/MonthlyChart";
import SectionCard         from "../../components/dashboard/SectionCard";

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ title, value, sub, accent, icon, trend }) => (
  <div className="bg-white rounded-2xl p-[22px] border border-gray-100 shadow-sm flex flex-col gap-3 relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: accent }} />
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.6px] m-0">{title}</p>
        <h2 className="text-[28px] font-bold text-gray-900 mt-[6px] mb-0 leading-none">{value}</h2>
        {sub && <p className="text-[11px] text-gray-400 mt-1">{sub}</p>}
      </div>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: accent + "18" }}>
        {icon}
      </div>
    </div>
    {trend != null && trend !== 0 && (
      <div className="flex items-center gap-[5px] text-[12px]">
        <span className={`font-semibold ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
        </span>
        <span className="text-gray-400">vs last month</span>
      </div>
    )}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const TODAY = new Date().toLocaleDateString("en-US", {
  weekday: "long", year: "numeric", month: "long", day: "numeric",
});

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [data, setData] = useState({
    totalCars: 0,
    totalBooking: 0,
    pendingBooking: 0,
    completeBooking: 0,
    recentBooking: [],
    monthlyRevenue: 0,
    totalEarning: 0,
  });

  useEffect(() => {
    setData(dummyDashboardData);
  }, []);

  const statCards  = buildStatCards(data, currency);
  const fleetRows  = buildFleetRows(data);

  return (
    <div className="min-h-screen bg-[#f8f9fb] font-inherit">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dash-section { animation: fadeIn 0.3s ease both; }
      `}</style>

      {/* ── Header ── */}
      <div className="px-7 pt-5 pb-6 bg-[#f8f9fb] border-b border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <div className="relative w-60">
            <svg className="absolute left-[11px] top-1/2 -translate-y-1/2 pointer-events-none"
              width="14" height="14" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input type="text" placeholder="Search anything…"
              className="w-full py-2 pl-8 pr-3 text-[13px] bg-white border border-gray-200 rounded-lg text-gray-700 outline-none placeholder:text-gray-400 focus:border-indigo-400 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-lg bg-white border border-gray-200 text-gray-500 flex items-center justify-center cursor-pointer text-base hover:bg-gray-50 transition-colors">🔔</button>
            <button className="w-9 h-9 rounded-lg bg-white border border-gray-200 text-gray-500 flex items-center justify-center cursor-pointer text-base hover:bg-gray-50 transition-colors">⚙️</button>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-[13px] text-white cursor-pointer"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>O</div>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[12px] text-gray-400 m-0 mb-1 font-medium">{TODAY}</p>
            <h1 className="text-[22px] font-bold text-gray-900 m-0">Owner Dashboard</h1>
            <p className="text-[13px] text-gray-500 mt-1 mb-0">Here's what's happening with your fleet today.</p>
          </div>
          <button className="flex items-center gap-[7px] bg-indigo-500 text-white border-none px-4 py-[9px] rounded-lg text-[12px] font-semibold cursor-pointer hover:bg-indigo-600 transition-colors">
            ⬇ Download Report
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-7 pt-6 pb-12">

        {/* Stat Cards */}
        <div className="dash-section grid gap-[14px] mb-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))" }}>
          {statCards.map((card) => <StatCard key={card.title} {...card} />)}
        </div>

        {/* Pending Banner */}
        {data.pendingBooking > 0 && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-xl px-4 py-3 mb-5 flex items-center gap-[10px] text-[13px] text-yellow-800">
            <span>⏳</span>
            <span><strong>{data.pendingBooking} booking{data.pendingBooking !== 1 ? "s" : ""}</strong> waiting for your approval.</span>
          </div>
        )}

        {/* Middle row: Recent Bookings + Chart */}
        <div className="dash-section grid gap-4 mb-4 items-start"
          style={{ gridTemplateColumns: "1fr 380px" }}>
          <RecentBookingsTable bookings={data.recentBooking} currency={currency} />
          <MonthlyChart currency={currency} />
        </div>

        {/* Bottom row: Fleet Availability + Quick Actions */}
        <div className="dash-section grid grid-cols-2 gap-4">

          {/* Fleet Availability */}
          <SectionCard title="Fleet Availability" sub="Current car status">
            <div className="px-[22px] py-4 flex flex-col gap-3">
              {fleetRows.map(({ label, value, total, color }) => {
                const pct = calcPercent(value, total);
                return (
                  <div key={label}>
                    <div className="flex justify-between mb-[5px] text-[12px]">
                      <span className="text-gray-700 font-medium">{label}</span>
                      <span className="text-gray-400">{value} <span className="text-[10px]">({pct}%)</span></span>
                    </div>
                    <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* Quick Actions */}
          <SectionCard title="Quick Actions" sub="Common tasks">
            <div className="px-[22px] py-4 grid grid-cols-2 gap-[10px]">
              {QUICK_ACTIONS.map(({ label, icon, accent, bg }) => (
                <button key={label}
                  className={`flex flex-col items-start gap-2 p-4 rounded-xl border-none cursor-pointer text-left transition-all hover:-translate-y-[2px] hover:shadow-md ${bg}`}>
                  <span className="text-[22px]">{icon}</span>
                  <span className={`text-[12px] font-semibold ${accent}`}>{label}</span>
                </button>
              ))}
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;