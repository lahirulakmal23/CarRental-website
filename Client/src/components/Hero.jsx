import React, { useState } from "react";
import { assets,cityList } from "../assets/constance/constance";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  return (
    <div className="w-full bg-[#eef3f8] pt-30 pb-10 min-h-[100vh]">
      {/* TITLE */}
      <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-10">
        Luxury Cars on Rent
      </h1>

      {/* SEARCH BOX */}
      <div className="flex justify-center p-4">
    
        <div
          className="
          bg-white shadow-xl rounded-2xl 
          p-6 md:px-8 md:py-5 
          flex flex-col md:flex-row 
          items-center 
          gap-6 md:gap-10 
          w-[90%] sm:w-[85%] md:w-[75%] lg:w-[60%]
        "
        >
          {/* Pickup Location */}
          <div className="flex flex-col w-full md:w-auto">
            <label className="font-semibold text-gray-700 text-sm">
              Pickup Location
            </label>
            <select required
              value={location ? location : "please select location"}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 border rounded-lg px-3 py-2 text-gray-600"
            >
                <option disabled value="please select location">Please select location</option>
                {cityList.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                ))}


            </select>
          </div>

      

          {/* Pick Up Date */}
          <div className="flex flex-col w-full md:w-auto">
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
          <div className="flex flex-col w-full md:w-auto">
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
            flex items-center gap-2 
            bg-blue-600 hover:bg-blue-700 
            text-white font-semibold 
            px-6 py-2 
            rounded-full 
            mt-6
          "
          >
            <img src={assets.search_icon} alt="search" className="w-4 h-4 " />
            Search
          </button>
          
        </div>
       
       
      </div>

      {/* CAR IMAGE */}
      <div className="flex justify-center mt-10">
        <img
          src={assets.main_car}
          alt="Luxury Car"
          className="w-[85%] sm:w-[70%] md:w-[60%] lg:w-[45%]"
        />
      </div>
    </div>
  );
};

export default Hero;
 