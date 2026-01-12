import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate JWT token
const getJwtToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid name, email and password (min 6 chars)"
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Generate token
    const token = getJwtToken(newUser._id.toString());

    res.status(201).json({
      success: true,
      token
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate token
    const token = getJwtToken(user._id.toString());

    res.json({success: true, token});

  } catch
   (error) {console.error(error.message);
    res.status(500).json({success: false,message: "Server error"});
  }
};

// get user data using token

export const getUserData = async (req, res) => {
    try {
        const {user} = req;
        res.json({success: true, data: user});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: "Server error"});
    }
};

