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
    <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-5 md:px-8 md:py-5 flex flex-col md:flex-row items-stretch md:items-end gap-5 md:gap-6">
      {/* Pickup Location */}
      <div className="flex flex-col w-full md:flex-1">
        <label className="flex items-center gap-2 font-semibold text-gray-800 text-sm">
          <MapPin className="w-4 h-4 text-blue-600" />
          Pick-up Location
        </label>
        <select
          required
          value={location ? location : "please select location"}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500"
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
      <div className="flex flex-col w-full md:flex-1">
        <label className="flex items-center gap-2 font-semibold text-gray-800 text-sm">
          <CalendarDays className="w-4 h-4 text-blue-600" />
          Pick-up Date
        </label>
        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          min={today}
          className="mt-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500"
        />
      </div>

      {/* Return Date */}
      <div className="flex flex-col w-full md:flex-1">
        <label className="flex items-center gap-2 font-semibold text-gray-800 text-sm">
          <CalendarDays className="w-4 h-4 text-blue-600" />
          Drop-off Date
        </label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          min={pickupDate || today}
          className="mt-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={() => navigate("/cars")}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-2.5 rounded-lg w-full md:w-auto cursor-pointer"
      >
        <Search className="w-4 h-4" />
        {buttonText}
      </button>
    </div>
  );
};

export default SearchBar;
