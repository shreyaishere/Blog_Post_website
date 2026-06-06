const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret_key";
const dotenv = require("dotenv");
dotenv.config();

//Register the user
router.post("/register", async (req, res) => {
  const { name, email, password} = req.body;

  try {
    //Check whether user exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Login route to compare the password
router.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ error: "Invalid Password" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });

  const role = user.role

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    })
    .status(200)
    .json({ message: "Login successful", user, token, role });
});

//Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

//read
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//read one data //Get logged-in user details
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
});

//Update
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;
