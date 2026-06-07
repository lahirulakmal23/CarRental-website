import { useState, useMemo } from "react";

const useBookingFilters = (bookings) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return bookings.filter((b) => {
      const matchesStatus = statusFilter === "all" || b.status === statusFilter;
      const matchesSearch =
        !query ||
        `${b.car.brand} ${b.car.model} ${b.user?.name || b.userName || ""}`.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [bookings, search, statusFilter]);

  return { search, setSearch, statusFilter, setStatusFilter, filtered };
};

export default useBookingFilters;