import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateOTP } from "../helper/otpGenerator.js";
import { sendOTPEmail } from "../helper/sendEmail.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, state, country, password } = req.body;

    //validate input
    if (!firstName || !lastName || !email || !state || !country || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create OTP and expiry
    const otpCode = generateOTP();
    const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    //create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      state,
      country,
      password,
      verificationToken: otpCode,
      verificationTokenExpiry: expiryTime,
    });
    await newUser.save();
    //send verification email
    await sendOTPEmail(email,firstName, otpCode,expiryTime
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


//login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email to login" });
    }
    //create  payload and token
    const payload = {
      userId: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, message: "Login successful" });
    //send login email notification
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};