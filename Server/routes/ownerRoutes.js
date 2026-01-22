import express from "express";
import { protect } from "../middlewares/auth.js";
import { changeRoleToOwner, addCar } from "../controllers/ownerController.js";
import upload from "../middlewares/multer.js";

const ownerRoutes = express.Router();

// Change role to owner
ownerRoutes.post("/change-role", protect, changeRoleToOwner);

// Add new car (protected + image upload)
ownerRoutes.post(
  "/add-car",
  protect,
  upload.single("image"),
  addCar
);

export default ownerRoutes;
