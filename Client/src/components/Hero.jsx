import React, { useState } from "react";
import { assets, cityList } from "../assets/constance/constance";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  return (
    <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 pt-24 md:pt-28 pb-24 md:pb-10 mt-10">
      {/* TOP SECTION: text left, car on gray panel right */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-4">
        {/* LEFT: text content */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-full px-4 py-1.5 mb-5">
            <span>👍</span>
            <span className="text-sm font-medium text-indigo-600">
              100% Trusted car rental platform
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            FAST AND EASY WAY
            <br />
            TO RENT A CAR
          </h1>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md">
            Discover a seamless car rental experience with us. Choose from a
            range of premium vehicles to suit your style and needs, and hit
            the road with confidence. Quick, easy, and reliable - rent your
            ride today!
          </p>
        </div>

        {/* RIGHT: car image on gray/purple background panel (independent sizes) */}
        <div className="w-full md:w-1/2 relative flex justify-center md:justify-end mt-8 md:mt-0">
          {/* Gray background panel - fixed size, does NOT control image size */}
          <div className="w-[90%] h-[180px] sm:h-[220px] md:h-[260px] bg-gradient-to-b from-indigo-100 to-indigo-200 rounded-2xl" />

          {/* Car image - sized independently, free to overflow the panel */}
          <img
            src={assets.main_car2}
            alt="Luxury Car"
            className="absolute bottom-0 left-1/2 md:left-auto md:right-0 -translate-x-1/2 md:translate-x-0 w-[110%] sm:w-[105%] md:w-[120%] max-w-none object-contain pointer-events-none"
          />
        </div>
      </div>

      {/* SEARCH BOX - overlaps bottom of hero */}
      <div className="max-w-5xl mx-auto px-4 mt-10 md:mt-8">
        <div
          className="
            bg-white shadow-xl rounded-2xl border border-gray-100
            p-5 md:px-8 md:py-5
            flex flex-col md:flex-row
            items-stretch md:items-center
            gap-5 md:gap-8
          "
        >
          {/* Pickup Location */}
          <div className="flex flex-col w-full md:w-auto md:flex-1">
            <label className="font-semibold text-gray-700 text-sm">
              Pickup Location
            </label>
            <select
              required
              value={location ? location : "please select location"}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 border rounded-lg px-3 py-2 text-gray-600"
            >
              <option disabled value="please select location">
                Please select location
              </option>
              {cityList.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Pick Up Date */}
          <div className="flex flex-col w-full md:w-auto md:flex-1">
            <label className="font-semibold text-gray-700 text-sm">
              Pick-up Date
            </label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="mt-1 border rounded-lg px-3 py-2 text-gray-600"
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col w-full md:w-auto md:flex-1">
            <label className="font-semibold text-gray-700 text-sm">
              Return Date
            </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="mt-1 border rounded-lg px-3 py-2 text-gray-600"
            />
          </div>

          {/* Search Button */}
          <button
            className="
              flex items-center justify-center gap-2
              bg-blue-600 hover:bg-blue-700
              text-white font-semibold
              px-6 py-2.5
              rounded-full
              w-full md:w-auto
              mt-1 md:mt-5
            "
          >
            <img src={assets.search_icon} alt="search" className="w-4 h-4" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;