import genToken from "../config/token.js";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists! Try again",
      });
    }
    const salt = await bcryptjs.genSalt(10);
    let hashedPassword = await bcryptjs.hash(password, salt);
    let user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // <generate token>
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully!",
      user,
    });
    // </generate token>
  } catch (error) {
    return res.status(500).json({
      message: `signup error ${error.message}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exists",
      });
    }
    // <comparePasswords>
    let isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials. Please try again.",
      });
    }
    // </comparePasswords>
    // <generate token>
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login successful!",
      user,
    });
    // </generate token>
  } catch (error) {
    return res.status(500).json({
      message: `login error ${error.message}`,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "Logout successful!" }); // <-- Add this line
  } catch (error) {
    return res.status(500).json({
      message: `logout error ${error.message}`,
    });
  }
};

export const getUserData = async (req, res) => {
  try {
    let userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        message:
          "User is not found, [auth.controller.js: userId from req.userId not found]",
      });
    }
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message:
          "User not found. [auth.controller.js @user not found in database!]",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error [auth.controller.js]` });
  }
};
