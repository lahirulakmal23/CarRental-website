import React, { useEffect, useState } from "react";
import {
  FiShoppingBag,
  FiList,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { dummyDashboardData } from "../../assets/constance/constance";

const DashboardStats = () => {
  const [data, setData] = useState({
    totalCars: 0,
    totalBooking: 0,
    pendingBooking: 0,
    completeBooking: 0,
    recentBooking: [],
    monthlyRevenue: 0,
  });

  const dashboardCard = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: FiShoppingBag,
      percent: "+12%",
    },
    {
      title: "Total Bookings",
      value: data.totalBooking,
      icon: FiList,
      percent: "+8%",
    },
    {
      title: "Pending Bookings",
      value: data.pendingBooking,
      icon: FiClock,
      percent: "-3%",
    },
    {
      title: "Completed Bookings",
      value: data.completeBooking,
      icon: FiCheckCircle,
      percent: "+15%",
    },
  ];

  useEffect(() => {
    setData(dummyDashboardData);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {dashboardCard.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-slate-800 rounded-lg p-4 items-center justify-between"
          >
            {/* Left */}
            <div className="flex justify-between flex-2">
            <p className="text-md text-gray-400 text-bold ">{item.title}</p>
              <Icon className="text-teal-400 text-xl mb-3 w-6 h-6  " />
              
             
            </div>

            {/* Right */}
            <div className="">
                <h2 className="text-white text-2xl font-semibold">
                {item.value}
              </h2>

              
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
