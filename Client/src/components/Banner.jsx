import React from "react";
import { assets } from "../assets/constance/constance";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row px-8  pt-10  justify-between items-center md:items-start bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] mx-20 rounded-2xl ">
      <div className="text-white">
        <h2 className="text-3xl ">Do you Own Luxury Car ?</h2>
        <p className="mt-3">
          Monetize your vehicle effortlessly by listing it on CarRental.
        </p>

        <p className="max-w-130">
          We take care of insurance, driver verification and secure payments —
          so you can earn passive income, stress-free.
        </p>

        <button className="bg-white text-primary hover:bg-slate-100 px-4 py-2  mt-10 rounded-sm cursor-pointer">List your Car</button>
      </div>
      <img
        src={assets.banner_car_image}
        alt="banner"
        className="max-h-45 mt-10 "
      />
    </div>
  );
};

export default Banner;
