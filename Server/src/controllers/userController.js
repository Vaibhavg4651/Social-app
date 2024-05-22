import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";


const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
    .status(400)
    .json({ message: "please provide email and password" });
  }
  const Email = email.toLowerCase();

  const user = await User.findOne({ email: Email });
  if (user === null) {
    throw new Error("Invalid  email or password");
  } else {
    const validate = await bcrypt.compare(password, user.password);
    if (validate) {
      const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1hr",
      });
      res.cookie("token", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 3600),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      sendEmail(req.body.email , user.name);
      res.status(200).json({ success: true, message: user, token: token });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  }
});
const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token" , {path: "/" , httpOnly: true , sameSite: "none" , secure: true, expires: new Date(0)});
    res.cookie.token = "";
    res.status(200).json({ success: true, message: "logout successfully" });
  });

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password , institution, age } = req.body;
  if (!email || !name || !password) {
    throw new Error("provide all details during registeration ...");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashedpassword = await bcrypt.hash(req.body.password, 10);
  const Email = email.toLowerCase();

  const newUser = new User({
    name: name,
    email: Email,
    password: hashedpassword,
    institution: institution,
    age: age,
    mood:[{"mood":"time"}],
    test:[{"time":"test"}]
  });
  const user = await newUser.save();
  sendEmail(req.body.email , req.body.name);
  res.status(200).json({ success: true, message: user });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.json({ success: true, message: users });
});


// @desc    Put user by ID
// @route   Put /api/user/:id

const getUserById = asyncHandler(async (req, res) => {
  const { id, newValue , check } = req.body;
  if(check === "User"){
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $push: { mood: newValue } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating field" });
  }
} if(check === "guser"){
  try {
    const user = await guser.findByIdAndUpdate(
      id,
      { $push: { mood: newValue } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating field" });
  }
}
});


const updateProfile = asyncHandler(async (req, res) => {
  const { id, newValue , check } = req.body;
  if(check === "User"){
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
} if(check === "guser"){
  try {
    const user = await guser.findByIdAndUpdate(
      id,
      { $push: { test: newValue } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating field" });
  }
}

});

 




export { authUser, registerUser,logout, getUsers, getUserById , updateProfile};