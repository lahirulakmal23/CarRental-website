import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CarCard from "./CarCard";
import { dummyCarData } from "../assets/constance/constance";

const PopularCars = () => {
  const navigate = useNavigate();

  return (
    <section className="px-6 md:px-16 pb-16">
      {/* Heading */}
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Popular Cars
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Choose from our most rented and trusted vehicles.
          </p>
        </div>
        <button
          onClick={() => navigate("/cars")}
          className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap cursor-pointer"
        >
          View All Cars <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dummyCarData.slice(0, 4).map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </section>
  );
};

export default PopularCars;
