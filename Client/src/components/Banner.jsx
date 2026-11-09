import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgePercent,
  CalendarCheck,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { assets } from "../assets/constance/constance";

const perks = [
  { icon: CalendarCheck, title: "Flexible Booking", text: "Change or cancel anytime" },
  { icon: ShieldCheck, title: "Safe & Reliable", text: "Well-maintained vehicles" },
  { icon: Headphones, title: "24/7 Support", text: "We're always here for you" },
];

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-16">
      <div className="relative flex min-h-screen min-h-[100svh] flex-col overflow-hidden bg-white">
        {/* Car image on the right, fading into white on the left */}
        <img
          src={assets.car_image4}
          alt="Car offer"
          className="absolute right-0 top-0 h-full w-full md:w-[65%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20 md:via-white/60 md:to-transparent md:from-35%" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent md:left-[35%]" />

        <div className="relative flex flex-1 flex-col justify-center px-6 md:px-16 py-14 md:py-24 [&>p]:max-w-md">
          <span className="w-fit flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
            <BadgePercent className="w-4 h-4" />
            Limited Time Offer
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Get <span className="text-blue-600">20% OFF</span>
            <br />
            Your Next Car Rental
          </h2>

          <p className="mt-3 text-sm text-gray-600">
            Explore more, spend less! Book now and enjoy a special discount on
            all car rentals. Your next adventure is waiting!
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/cars")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold px-5 py-2.5 rounded-full cursor-pointer"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/cars")}
              className="border border-blue-200 bg-white hover:bg-blue-50 transition text-blue-600 text-sm font-semibold px-5 py-2.5 rounded-full cursor-pointer"
            >
              View Deals
            </button>
          </div>
        </div>

        {/* Perks over the image */}
        <div className="relative md:absolute md:right-10 md:bottom-6 flex flex-wrap gap-5 px-6 pb-6 md:p-0 text-white">
          {perks.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-2">
              <div className="w-9 h-9 shrink-0 rounded-full border border-white/60 flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold">{title}</p>
                <p className="text-[11px] text-gray-200">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;

