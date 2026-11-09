import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { assets, dummyCarData } from "../assets/constance/constance";
import useCarFilter, { seatOptions } from "../hooks/useCarFilter";
import { carCategories } from '../assets/constance/carCategories';
import CarCard from "../components/CarCard";
import SearchBar from "../components/SearchBar";

// Lowest / highest daily price in the data, used as the price slider limits
const priceLimits = [
  Math.min(...dummyCarData.map((car) => car.pricePerDay)),
  Math.max(...dummyCarData.map((car) => car.pricePerDay)),
];

const countBy = (match) => dummyCarData.filter(match).length;

const FilterGroup = ({ title, options, selected, onToggle }) => (
  <div className="mb-6">
    <h4 className="font-semibold text-sm text-gray-900 mb-3">{title}</h4>
    {options.map(({ label, count }) => (
      <label
        key={label}
        className="flex items-center gap-2 mb-2 text-sm text-gray-600 cursor-pointer"
      >
        <input
          type="checkbox"
          checked={selected.includes(label)}
          onChange={() => onToggle(label)}
          className="w-4 h-4 accent-blue-600"
        />
        {label} <span className="text-gray-400">({count})</span>
      </label>
    ))}
  </div>
);

const Cars = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTypes = searchParams.getAll("category").filter((type) => carCategories.some((category) => category.name === type));
  const currencySymbol = import.meta.env.VITE_CURRENCY || "$";
  const [sortBy, setSortBy] = useState("popular");
  const [filters, setFilters] = useState({

    transmissions: [],
    seats: [],
    price: priceLimits,
  });

  const filteredCars = useCarFilter(dummyCarData, { ...filters, types: selectedTypes }, sortBy);

  // Filter options (with counts) built from the car data
  const typeOptions = useMemo(
    () =>
      carCategories.map(({ name: type }) => ({
        label: type,
        count: countBy((car) => car.category === type),
      })),
    []
  );

  const transmissionOptions = useMemo(
    () =>
      [...new Set(dummyCarData.map((car) => car.transmission))].map((t) => ({
        label: t,
        count: countBy((car) => car.transmission === t),
      })),
    []
  );

  const seatFilterOptions = useMemo(
    () =>
      seatOptions.map((option) => ({
        label: option.label,
        count: countBy((car) => option.match(car.seating_capacity)),
      })),
    []
  );

  const toggle = (key) => (value) => {
    if (key === "types") {
      const nextTypes = selectedTypes.includes(value) ? selectedTypes.filter((type) => type !== value) : [...selectedTypes, value];
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("category");
      nextTypes.forEach((type) => nextParams.append("category", type));
      setSearchParams(nextParams);
      return;
    }
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));

  };

  const setPrice = (index) => (e) => {
    const value = Number(e.target.value);
    setFilters((prev) => {
      const price = [...prev.price];
      price[index] = value;
      // keep min <= max
      if (price[0] > price[1]) price[index === 0 ? 1 : 0] = value;
      return { ...prev, price };
    });
  };

  const [minLimit, maxLimit] = priceLimits;
  const percent = (value) =>
    ((value - minLimit) / (maxLimit - minLimit || 1)) * 100;

  return (
    <div className="mt-16 bg-slate-50 min-h-screen">
      {/* HERO SECTION */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.hero_new})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
        <div className="relative px-6 md:px-16 py-14 md:py-16 text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold">Our Cars</h1>
          <p className="mt-3 text-sm md:text-base text-gray-200 max-w-md">
            Find the perfect car for your journey. We offer a wide range of
            vehicles for every need and budget.
          </p>
        </div>
      </div>

      {/* SEARCH BAR - below the hero */}
      <div className="px-6 md:px-16 pt-6">
        <SearchBar buttonText="Search" />
      </div>

      {/* MAIN CONTENT */}
      <div className="px-6 md:px-16 py-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT FILTER */}
        <aside className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-fit">
          <h3 className="font-bold text-lg text-gray-900 mb-5">Filter</h3>

          <FilterGroup
            title="Car Type"
            options={typeOptions}
            selected={selectedTypes}
            onToggle={toggle("types")}
          />
          <FilterGroup
            title="Transmission"
            options={transmissionOptions}
            selected={filters.transmissions}
            onToggle={toggle("transmissions")}
          />
          <FilterGroup
            title="Seats"
            options={seatFilterOptions}
            selected={filters.seats}
            onToggle={toggle("seats")}
          />

          {/* PRICE RANGE */}
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-4">
              Price Range (per day)
            </h4>
            <div className="relative h-5">
              <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 rounded-full bg-gray-200" />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-blue-600"
                style={{
                  left: `${percent(filters.price[0])}%`,
                  right: `${100 - percent(filters.price[1])}%`,
                }}
              />
              {[0, 1].map((index) => (
                <input
                  key={index}
                  type="range"
                  min={minLimit}
                  max={maxLimit}
                  value={filters.price[index]}
                  onChange={setPrice(index)}
                  className="price-range absolute inset-0 w-full appearance-none bg-transparent pointer-events-none"
                />
              ))}
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-700 mt-3">
              <span>
                {currencySymbol}
                {filters.price[0]}
              </span>
              <span>
                {currencySymbol}
                {filters.price[1]}
              </span>
            </div>
          </div>
        </aside>

        {/* RIGHT - CARS */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">
                {filteredCars.length}
              </span>{" "}
              cars found
            </p>

            <label className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-500">
              Sort by:
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-gray-900 outline-none bg-transparent cursor-pointer"
              >
                <option value="popular">Popular</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>

          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 py-16 text-center text-gray-500">
              No cars match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;


