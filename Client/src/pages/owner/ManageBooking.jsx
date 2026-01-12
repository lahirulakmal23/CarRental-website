import React from "react";
import { useEffect, useState } from "react";
import { dummyMyBookingsData , assets } from "../../assets/constance/constance";

const ManageBooking = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [booking, setBooking] = useState([]);
  const fetchBooking = async () => {
    // later fetch from backend
    setBooking(dummyMyBookingsData );
  };
  useEffect(() => {
    fetchBooking();
  }, []);
  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <h1 className="text-2xl font-bold">Manage Bookings</h1>
      <h4>Here you can manage your Bookings</h4>

      <div className="max-w-3xl w-full rounded-md mt-6 ">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="bg-slate-100">  
            <tr>
              <th className="px-4 py-3  font-medium ">Car</th>
              <th className="px-4 py-3 font-medium max-md:hidden">Date Range</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Payment</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((booking) => (
              <tr key={booking.id} className=" hover:bg-gray-50 "> 
                <td className="px-2 py-3 flex items-center gap-3">
                  <img
                    src={booking.car.image}
                    alt={booking.car.model}
                    className="w-16 h-10 object-cover rounded-md "
                  />
                  <div>
                    <div className="font-medium">
                      {booking.car.brand} {booking.car.model}
                    </div>
                   
                  </div>
                </td>
                <td className="px-4 py-3 max-md:hidden">{booking.pickupDate.split("T")[0]} to {booking.returnDate.split("T")[0]}</td>
                <td className="px-4 py-3">
                  {currency} ${booking.price}
                </td>
                <td className="px-4 py-3">
                  <p>active</p>
                  </td>
                <td className="px-4 py-3">
                  {booking.status === 'pending' ? (
                    <select value={booking.status} className="px-2 py-1.5 mt-4 text-gray-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
                    }`}>
                      {booking.status === 'confirmed' ? "Confirmed" : "Cancelled"}
                    </span>
                  )}
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;
