import React, { useState } from "react";
import { assets, dummyCarData } from "../assets/constance/constance";
import useCarFilter from "../hooks/useCarFilter";
import CarCard from "../components/CarCard";

const Cars = () => {
  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState({
    wedding: false,
    classic: false,
    luxury: false,
  });

  const [types, setTypes] = useState({
    suv: false,
    sedan: false,
    hatchback: false,
  });

  const filteredCars = useCarFilter(
    dummyCarData,
    search,
    categories,
    types
  );

  const handleCheckbox = (setState) => (e) => {
    const { name, checked } = e.target;
    setState((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div>
      {/* HERO SECTION */}
      <div className="bg-gray-100 py-20 text-center mt-4">
        <h1 className="text-3xl font-bold mb-2">Cars Collection</h1>
        <p className="text-gray-500 mb-6">
          Find your perfect ride with ease
        </p>

        {/* SEARCH BAR */}
        <div className="mx-auto flex items-center bg-white border rounded-lg px-4 h-12 w-[90%] sm:w-[400px] gap-2">
          <img src={assets.search_icon} alt="search" className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search cars..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* LEFT FILTER */}
        <div className="bg-white p-5 h-fit ">
          <h3 className="font-semibold mb-6 text-lg">FILTERS</h3>

          {/* CATEGORIES */}
          <div className="border p-4 mb-6">
            <h4 className="font-semibold mb-3">CATEGORIES</h4>

            {["wedding", "classic", "luxury"].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 mb-2 capitalize"
              >
                <input
                  type="checkbox"
                  name={cat}
                  checked={categories[cat]}
                  onChange={handleCheckbox(setCategories)}
                />
                {cat}
              </label>
            ))}
          </div>

          {/* TYPE */}
          <div className="border p-4">
            <h4 className="font-semibold mb-3">TYPE</h4>

            {["suv", "sedan", "hatchback"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 mb-2 capitalize"
              >
                <input
                  type="checkbox"
                  name={type}
                  checked={types[type]}
                  onChange={handleCheckbox(setTypes)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* RIGHT - CARS */}
        <div className="lg:col-span-3">
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredCars.length} cars
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cars;
