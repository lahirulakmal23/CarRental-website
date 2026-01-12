import mongoose from 'mongoose';
import dotenv from 'dotenv';


const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
export default ConnectDB;