import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CalendarDays, Search } from "lucide-react";
import { cityList } from "../assets/constance/constance";

// Pick-up location / dates search box, shared by the Home hero and the Cars page
const SearchBar = ({ buttonText = "Search Cars" }) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-4 sm:p-5 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end gap-4 lg:gap-6">
      {/* Pickup Location */}
      <div className="flex min-w-0 flex-col w-full">
        <label className="flex items-center gap-2 font-semibold text-gray-800 text-sm">
          <MapPin className="w-4 h-4 text-blue-600" />
          Pick-up Location
        </label>
        <select
          required
          value={location ? location : "please select location"}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-2 min-h-11 min-w-0 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500"
        >
          <option disabled value="please select location">
            Select location
          </option>
          {cityList.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Pick Up Date */}
      <div className="flex min-w-0 flex-col w-full">
        <label className="flex items-center gap-2 font-semibold text-gray-800 text-sm">
          <CalendarDays className="w-4 h-4 text-blue-600" />
          Pick-up Date
        </label>
        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          min={today}
          className="mt-2 min-h-11 min-w-0 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500"
        />
      </div>

      {/* Return Date */}
      <div className="flex min-w-0 flex-col w-full">
        <label className="flex items-center gap-2 font-semibold text-gray-800 text-sm">
          <CalendarDays className="w-4 h-4 text-blue-600" />
          Drop-off Date
        </label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          min={pickupDate || today}
          className="mt-2 min-h-11 min-w-0 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={() => navigate("/cars")}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-2.5 rounded-lg min-h-11 w-full cursor-pointer"
      >
        <Search className="w-4 h-4" />
        {buttonText}
      </button>
    </div>
  );
};

export default SearchBar;

