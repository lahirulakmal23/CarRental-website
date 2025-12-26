import React from "react";
import { assets } from "../assets/constance/constance";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const currencySymbol = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  return (
  <div
  onClick={() => navigate(`/car-details/${car._id}`)}
  className="bg-white group rounded-xl shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1 overflow-hidden cursor-pointer"
>

      {/* Image */}
      <div className="relative">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-44 object-cover"
        />

        {/* Available Badge */}
        {car.isAvaliable ? (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
            Available Now
          </span>
        ) : (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
            Not Available
          </span>
        )}

        {/* Price */}
        <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
          {currencySymbol}
          {car.pricePerDay}/day
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">
          {car.brand} {car.model}
        </h3>
        <p className="text-sm text-gray-500">
          {car.category} {car.year}
        </p>

        {/* Info */}
        <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mt-4">
          <div className="flex items-center text-sm text-muted-foreground bg-blue-50 p-2 rounded-lg  w-fit">
            <img
              src={assets.users_icon}
              alt="users icon"
              className="h-4 mr-2"
            />
            <span> {car.seating_capacity} Seats</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground bg-blue-50  p-2 rounded-lg  w-fit">
            <img src={assets.fuel_icon} alt="users icon" className="h-4 mr-2" />
            <span> {car.fuel_type}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground bg-blue-50 p-2 rounded-lg  w-fit">
            <img src={assets.car_icon} alt="users icon" className="h-4 mr-2" />
            <span> {car.transmission}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground bg-blue-50  p-2 rounded-lg  w-fit">
            <img
              src={assets.location_icon}
              alt="users icon"
              className="h-4 mr-2"
            />
            <span> {car.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
