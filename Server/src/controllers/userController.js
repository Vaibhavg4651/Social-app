import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// @desc    Login a user
// @route   POST /api/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "please provide email and password" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: "Invalid email format" });
		}

  const Email = email.toLowerCase();

  const user = await User.findOne({ user_email: Email });
  if (user === null) {
    throw new Error("Invalid  email or password");
  } else {
    const validate = await bcrypt.compare(password, user.user_password);
    if (validate) {
      const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "15d",
      });
      res.cookie("token", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 3600),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({ success: true, message: user, token: token });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  }
});

// @desc    Logout user
// @route   GET /api/logout

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    path: "/",
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expires: new Date(0),
  });
  res.cookie.token = "";
  res.status(200).json({ success: true, message: "logout successfully" });
});

// @desc    Register a new user
// @route   POST /api/register
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    user_email,
    user_password,
    user_name
  } = req.body;
  
  try{
    if (!user_email || !name || !user_password || !user_name) {
      throw new Error("provide all details during registeration ...");
    }
    const userExists = await User.findOne({user_email});

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(user_password, salt);
    const Email = user_email.toLowerCase();

    const newUser = new User({
      name,
      user_email: Email,
      user_password: hashedpassword,
      user_name
    });
    const user = await newUser.save();
    res.status(200).json({ success: true, message: user });
  } catch (error) {
      console.error(error);
        res.status(400).json({ message: "Error updating field" });
    }
  });


// @desc    Get all users
// @route   GET /api/users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.json({ success: true, message: users });
});

// @desc    GET user by ID
// @route   GET /api/user/:id

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.query;
    try {
      const user = await User.findById(
        id
      );
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating field" });
    }
  // if (check === "guser") {
  //   try {
  //     const user = await guser.findByIdAndUpdate(
  //       id,
  //       { $push: { mood: newValue } },
  //       { new: true }
  //     );
  //     res.json(user);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Error updating field" });
  //   }
  // }
});

// @desc    update user by ID
// @route   Put /api/user/:id

const updateProfile = asyncHandler(async (req, res) => {
  const { id, newValue} = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { $push: { test: newValue } },
        { new: true }
      );
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating field" });
  }
  // if (check === "guser") {
  //   try {
  //     const user = await guser.findByIdAndUpdate(
  //       id,
  //       { $push: { test: newValue } },
  //       { new: true }
  //     );
  //     res.json(user);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Error updating field" });
  //   }
  // }
});

export { authUser, registerUser, logout, getUsers, getUserById, updateProfile };
