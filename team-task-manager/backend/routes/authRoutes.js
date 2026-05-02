const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("SIGNUP DATA:", name, email, password);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({ message: "User created" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN DATA:", email, password);

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check password
    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // success
   const token = jwt.sign(
  { id: user._id },
  "secret123",
  { expiresIn: "1d" }
);

res.json({
  message: "Login success",
  token
});

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;