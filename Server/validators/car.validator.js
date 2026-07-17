import { body, param } from "express-validator";

export const addCarValidator = [
  body("brand").trim().notEmpty().withMessage("Brand is required"),
  body("model").trim().notEmpty().withMessage("Model is required"),
  body("year")
    .isInt({ min: 1990, max: new Date().getFullYear() + 1 })
    .withMessage("Enter a valid year"),
  body("category")
    .isIn(["Sedan", "SUV", "Hatchback", "Luxury", "Van"])
    .withMessage("Invalid category"),
  body("pricePerDay")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("transmission")
    .optional()
    .isIn(["Automatic", "Manual"])
    .withMessage("Invalid transmission type"),
  body("fuelType")
    .optional()
    .isIn(["Petrol", "Diesel", "Electric", "Hybrid"])
    .withMessage("Invalid fuel type"),
  body("seats")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage("Enter a valid seat count"),
];

export const updateCarValidator = [
  param("id").isMongoId().withMessage("Invalid car ID"),
  body("pricePerDay")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("year")
    .optional()
    .isInt({ min: 1990, max: new Date().getFullYear() + 1 })
    .withMessage("Enter a valid year"),
];

export const carIdValidator = [
  param("id").isMongoId().withMessage("Invalid car ID"),
];