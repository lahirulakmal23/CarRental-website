import { useState, useMemo } from "react";
import { dummyCarData } from "../assets/constance/constance";

const useFilters = (cars) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = useMemo(
    () => ["all", ...new Set(dummyCarData.map((c) => c.category))],
    []
  );

  const filtered = useMemo(() => {
    const query = search.toLowerCase();

    return cars.filter((car) => {
      const matchesSearch =
        !query ||
        `${car.brand} ${car.model} ${car.category}`.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "available" && car.isAvaliable) ||
        (statusFilter === "rented" && !car.isAvaliable);

      const matchesCategory =
        categoryFilter === "all" || car.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [cars, search, statusFilter, categoryFilter]);

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    categories,
    filtered,
  };
};

export default useFilters;