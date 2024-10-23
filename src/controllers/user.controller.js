const UserModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

exports.Register = async (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body;

  // Checking for empty values
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Missing required fields",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ status: "fail", message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await UserModel.create({
      first_name,
      last_name,
      email,
      phone,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ status: "success", message: "User created successfully" });
  } catch (err) {
    console.error("Sign-up error:", err);
    return res
      .status(500)
      .json({ status: "fail", message: "An error occurred during sign-up" });
  }
};

exports.GetUser = async (req, res) => {
  try {
    // The user information is now available in req.user
    const user = req.user;

    if (!user) {
      return res.status(401).json({ status: "fail", message: "User not authenticated" });
    }

    const data = {
      message: "User data retrieved successfully",
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar
        // Add any other fields you want to include
      }
    };

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    console.error("Error fetching user data:", err);
    return res.status(500).json({ status: "fail", message: "An error occurred while fetching user data" });
  }
};
