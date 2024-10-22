const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const UserModel = require("../models/user.model.js");
const UserController = require("../controllers/user.controller.js");
const multer = require("multer");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split(" ").join("-") + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

// Sign-up route
router.post("/auth/register", upload.single("avatar"), UserController.Register);

// Sign-in route
router.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "fail", message: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      status: "success",
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    res
      .status(500)
      .json({ status: "fail", message: "An error occurred during sign-in" });
  }
});

// Refresh token route
router.post("/auth/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(400)
      .json({ status: "fail", message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ status: "success", accessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(401).json({ status: "fail", message: "Invalid refresh token" });
  }
});

module.exports = router;
