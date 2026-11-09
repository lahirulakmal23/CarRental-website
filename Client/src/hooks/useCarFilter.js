import { useMemo } from "react";

export const seatOptions = [
  { label: "2 Seats", match: (seats) => seats <= 3 },
  { label: "4-5 Seats", match: (seats) => seats >= 4 && seats <= 5 },
  { label: "6-8 Seats", match: (seats) => seats >= 6 && seats <= 8 },
  { label: "9+ Seats", match: (seats) => seats >= 9 },
];

const sorters = {
  popular: () => 0,
  priceLow: (a, b) => a.pricePerDay - b.pricePerDay,
  priceHigh: (a, b) => b.pricePerDay - a.pricePerDay,
  newest: (a, b) => b.year - a.year,
};

// filters = { types: [], transmissions: [], seats: [], price: [min, max] }
const useCarFilter = (cars, filters, sortBy = "popular") => {
  return useMemo(() => {
    const { types, transmissions, seats, price } = filters;

    const result = cars.filter((car) => {
      //  Car type filter (Sedan, SUV, ...)
      const matchType = types.length === 0 || types.includes(car.category);

      //  Transmission filter
      const matchTransmission =
        transmissions.length === 0 || transmissions.includes(car.transmission);

      //  Seats filter
      const matchSeats =
        seats.length === 0 ||
        seatOptions.some(
          (option) =>
            seats.includes(option.label) && option.match(car.seating_capacity)
        );

      //  Price range filter
      const matchPrice =
        car.pricePerDay >= price[0] && car.pricePerDay <= price[1];

      return matchType && matchTransmission && matchSeats && matchPrice;
    });

    return [...result].sort(sorters[sortBy] || sorters.popular);
  }, [cars, filters, sortBy]);
};

export default useCarFilter;
