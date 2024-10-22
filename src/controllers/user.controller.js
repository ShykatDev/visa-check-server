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
