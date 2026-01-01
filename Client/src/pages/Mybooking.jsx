import React, { useEffect, useState } from "react";
import { dummyMyBookingsData } from "../assets/constance/constance";

const Mybooking = () => {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    setBooking(dummyMyBookingsData);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-12">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-sm text-gray-500">
          View and manage your car bookings
        </p>
      </div>

      {/* BOOKINGS LIST */}
      <div className="space-y-6">
        {booking.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-300 rounded-lg p-5 flex flex-col lg:flex-row gap-6"
          >
            {/* IMAGE */}
            <img
              src={item.car.image}
              alt={item.car.name}
              className="w-full lg:w-60 h-36 object-cover rounded-lg"
            />

            {/* DETAILS */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">
                {item.car.name}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {item.car.year} · {item.car.brand} · {item.car.model}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <p>
                  <span className="font-medium bg-gray-200 px-2 ">Booking ID:</span>
                  {item.bookingId}
                  
                  <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-600 rounded">
                    {item.status}
                  </span>
                </p>

                <p>
                  <span className="font-medium">PickupDate:</span>
                  {item.pickupDate}
                </p>

                <p>
                  <span className="font-medium">ReturnDate:</span>
                  {item.location}
                </p>

                <p>
                  <span className="font-medium">Return Location:</span>
                  {item.returnDate}
                </p>
              </div>
            </div>

            {/* PRICE */}
            <div className="text-right min-w-[150px]">
              <p className="text-sm text-gray-500 font-semibold">Total Price</p>
              <p className="text-xl font-bold text-blue-600">
                ${item.price}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Booked on {item.bookedOn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mybooking;
