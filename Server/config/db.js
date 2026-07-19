import mongoose from "mongoose";
import { setServers } from "node:dns/promises";
import { env } from "./env.js";

setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // stop the app if DB connection fails — don't run a broken server
  }
};

export default connectDB;