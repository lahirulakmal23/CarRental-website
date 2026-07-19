import express from "express";
import {changeRoleToOwner, addCar, getDashboard,} from "../controllers/owner.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const ownerRoutes = express.Router();

ownerRoutes.post("/change-role", protect, changeRoleToOwner);

ownerRoutes.post(
  "/add-car",
  protect,
  authorize("owner"),
  upload.single("image"),
  addCar,
);

ownerRoutes.get("/dashboard", protect, authorize("owner"), getDashboard);

export default ownerRoutes;
