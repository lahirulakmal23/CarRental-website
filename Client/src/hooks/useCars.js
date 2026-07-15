import { useState, useEffect } from "react";
import { dummyCarData } from "../assets/constance/constance.js";

const useCars = (showToast) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    setCars(dummyCarData);
  }, []);

  const updatePrice = (id, newPrice) => {
    setCars((prev) =>
      prev.map((car) => (car.id === id ? { ...car, pricePerDay: newPrice } : car))
    );
    showToast("Price updated successfully", "success");
  };

  const toggleStatus = (id) => {
    setCars((prev) =>
      prev.map((car) => {
        if (car.id !== id) return car;
        const updated = { ...car, isAvaliable: !car.isAvaliable };
        showToast(
          `${car.brand} ${car.model} marked as ${updated.isAvaliable ? "Available" : "Rented Out"}`,
          updated.isAvaliable ? "success" : "warning"
        );
        return updated;
      })
    );
  };

  const deleteCar = (target, onDone) => {
    setCars((prev) => prev.filter((car) => car.id !== target.id));
    showToast(`${target.brand} ${target.model} removed`, "error");
    onDone?.();
  };

  const availableCount = cars.filter((c) => c.isAvaliable).length;
  const totalRevenue = cars.reduce((sum, c) => sum + c.pricePerDay, 0);

  return { cars, updatePrice, toggleStatus, deleteCar, availableCount, totalRevenue };
};

export default useCars;