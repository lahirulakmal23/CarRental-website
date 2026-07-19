import { Router } from "express";
import {
  addCar,
  getAllCars,
  getCarById,
  getMyCars,
  updateCar,
  deleteCar,
} from "../controllers/car.controller.js";
import {
  addCarValidator,
  updateCarValidator,
  carIdValidator,
} from "../validators/car.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = Router();

// public routes
router.get("/", getAllCars);
router.get("/:id", carIdValidator, validate, getCarById);

// owner-only routes — note: specific route ("/my-cars") before dynamic ("/:id") isn't
// an issue here since they're on different methods, but keep this order habit in mind
router.get("/owner/my-cars", protect, authorize("owner"), getMyCars);
router.post("/", protect, authorize("owner"), addCarValidator, validate, addCar);
router.patch(
  "/:id",
  protect,
  authorize("owner"),
  updateCarValidator,
  validate,
  updateCar
);
router.delete("/:id", protect, authorize("owner"), carIdValidator, validate, deleteCar);

export default router;