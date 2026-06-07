import { useMemo } from "react";

const useCarFilter = (cars, search, categories, types) => {
  return useMemo(() => {
    return cars.filter((car) => {
      //  Search filter
      const matchSearch =
        car.brand.toLowerCase().includes(search.toLowerCase()) ||
        car.model.toLowerCase().includes(search.toLowerCase());

      //  Category filter
      const selectedCategories = Object.keys(categories).filter(
        (key) => categories[key]
      );

      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(car.category.toLowerCase());

      //  Type filter
      const selectedTypes = Object.keys(types).filter((key) => types[key]);

      const matchType =
        selectedTypes.length === 0 ||
        selectedTypes.includes(car.type.toLowerCase());

      return matchSearch && matchCategory && matchType;
    });
  }, [cars, search, categories, types]);
};

export default useCarFilter;
