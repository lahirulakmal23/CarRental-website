import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/constance/constance";
import  BookingBarChart from "../../components/dashboard/BarChart";
import RevenuePieChart from "../../components/dashboard/PieChart";
import RevenueLineChart from "../../components/dashboard/RevenueLineChart";
import {
  FiSearch,
  FiBell,
  FiMoon,
  FiSettings,
  FiDownload,
} from "react-icons/fi";
import Card from "../../components/dashboard/Card";

const Dashborad = () => {
  const [data, setData] = useState({
    totalCars: 0,
    totalBooking: 0,
    pendingBooking: 0,
    completeBooking: 0,
    recentBooking: [],
    monthlyRevenue: 0,
  });

  // Dashboard cards config
  const dashboardCard = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: data.totalBooking,
      icon: assets.listIconColored,
    },
    {
      title: "Pending Bookings",
      value: data.pendingBooking,
      icon: assets.cautionIconColored,
    },
    {
      title: "Completed Bookings",
      value: data.completeBooking,
      icon: assets.listIconColored,
    },
  ];




  useEffect(() => {
    setData(dummyDashboardData);
  }, []);
  return (
    <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 ">
      {/* header section */}
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="relative w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-md bg-slate-700 text-sm text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-gray-300">
          <FiMoon className="cursor-pointer hover:text-white" />
          <FiBell className="cursor-pointer hover:text-white" />
          <FiSettings className="cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-6 flex items-center justify-between">
        {/* Title */}
        <div>
          <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
          <p className="text-sm text-gray-400">Welcome to your dashboard</p>
        </div>

        {/* Button */}
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm">
          <FiDownload />
          Download Reports
        </button>
      </div>

      {/* card section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {dashboardCard.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-md shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500 font-semibold">
                {item.title}
              </p>
              <h2 className="text-2xl font-semibold mt-1">{item.value}</h2>
            </div>

            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
              <img src={item.icon} alt={item.title} className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>
     
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* LEFT: Recent Bookings */}
            <div className="lg:col-span-2 bg-white rounded-md p-6 shadow-sm">
  <h2 className="text-lg font-semibold text-gray-800">
    Recent Bookings
  </h2>
  <p className="text-sm text-gray-500 mb-6">
    Latest customer bookings
  </p>

  {/* HEADER ROW */}
  <div className="flex items-center text-xs text-gray-500 uppercase border-b pb-2 mb-4">
    <div className="w-[30%] ">Car</div>
    <div className="w-[15%] ">Pickup</div>
    <div className="w-[15%]">Return</div>
    <div className="w-[20%]">Location</div>
    <div className="w-[10%] text-right">Price</div>
    <div className="w-[10%] text-right">Status</div>
  </div>

  {/* DATA ROWS */}
  <div className="space-y-5">
    {data.recentBooking.map((item, index) => (
      <div
        key={index}
        className="flex items-center text-sm"
      >
        {/* Car */}
        <div className="w-[30%] flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
            <img
              src={assets.carIconColored}
              alt="car"
              className="w-5 h-5"
            />
          </div>

          <div>
            <p className="font-medium text-gray-800">
              {item.car.brand} {item.car.model}
            </p>
            <p className="text-xs text-gray-500">
              #{item.bookingId}
            </p>
          </div>
        </div>

        {/* Pickup Date */}
        <div className="w-[15%] text-gray-600">
          {item.pickupDate}
        </div>

        {/* Return Date */}
        <div className="w-[15%] text-gray-600">
          {item.returnDate}
        </div>

        {/* Location */}
        <div className="w-[20%] text-gray-600">
          {item.location}
        </div>

        {/* Price */}
        <div className="w-[10%] text-right font-medium text-gray-700">
          ${item.price}
        </div>

        {/* Status */}
        <div className="w-[10%] text-right">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium
              ${
                item.status === "Confirmed"
                  ? "bg-blue-100 text-blue-600"
                  : item.status === "Completed"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
          >
            {item.status}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>


        <div className=" grid grid-rows-2 h-100 gap-4">
          <div className="bg-white rounded-md ">
            <BookingBarChart />
          </div>
          <div className=" rounded-md bg-white " >
            <RevenueLineChart/>
          </div>
           
        </div>

      
      </div>
    </div>
  );
};

export default Dashborad;
