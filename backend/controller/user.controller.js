import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  const { hashedPassword, ...detailsWithoutPassword } = user.toObject();

  res.status(200).json(detailsWithoutPassword);
};

export const registerUser = async (req, res) => {
  const { username, displayName, email, password } = req.body;
  if (!username || !displayName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exist!" });
  }
  const user = await User.create({
    username,
    displayName,
    email,
    password,
  });

  if (!user) {
    return res.status(400).json({ message: "User not registred" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIREY,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  });


  const { hashedPassword, ...detailsWithoutPassword } = user.toObject();

  return res.status(201).json(detailsWithoutPassword);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid credentials pass" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIREY,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  });

  return res.status(201).json({
    username: user.username,
    displayName: user.displayName,
    email: user.email,
  });
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token")
  res.status(200).json({message: "Logout successfull"})
};
