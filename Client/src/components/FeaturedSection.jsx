import React from "react";
import CarCard from "./CarCard";
import { dummyCarData } from "../assets/constance/constance";
import { useNavigate } from "react-router-dom";

const FeaturedVehicles = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Featured Vehicles</h2>
        <p className="text-gray-500 mt-2">
          Explore our selection of premium vehicles available for your next
          adventure.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {dummyCarData.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate("/cars")}
          className="border px-6 py-2 rounded-lg hover:bg-gray-100 transition flex items-center gap-2"
        >
          Explore all cars →
        </button>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
