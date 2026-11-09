import React from "react";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const currencySymbol = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div
        onClick={() => navigate(`/car-details/${car._id}`)}
        className="relative bg-gray-50 h-40 overflow-hidden cursor-pointer"
      >
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
        />
        {!car.isAvaliable && (
          <span className="absolute top-3 left-3 bg-gray-900/80 text-white text-xs px-3 py-1 rounded-full">
            Not Available
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900">
          {car.brand} {car.model}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {car.category} <span className="mx-1">|</span>
          {car.seating_capacity} Seats <span className="mx-1">|</span>
          {car.transmission}
        </p>

        <p className="mt-4 mb-4">
          <span className="text-xl font-bold text-blue-600">
            {currencySymbol}
            {car.pricePerDay}
          </span>
          <span className="text-sm text-gray-500"> / day</span>
        </p>

        <button
          onClick={() => navigate(`/car-details/${car._id}`)}
          className="mt-auto w-full bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold py-2 rounded-lg cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;
