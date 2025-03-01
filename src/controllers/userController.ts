import express, { RequestHandler } from "express";
import User from "../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const userRegister: RequestHandler = async (req, res) => {
  const { email, firstName, lastName, mobile, password, age } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      firstName,
      lastName,
      mobile,
      password: hashedPassword,
      age,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const userLogin: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.json({ message: "You are logged in successfully!", userId: user._id });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const userController = {
  userRegister,
  userLogin,
};
