const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 5);

  await User.create({
    email: req.body.email,
    password: hashed
  });

  res.json({ message: "Signup successful" });
});

// SIGNIN
router.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(403).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!match) {
    return res.status(403).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

module.exports = router;
