const UserModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const path = require("path");
const cloudinary = require("../config/cloudinary.js");

exports.Register = async (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body;
  const avatar = req.file;

  // Checking for empty values
  if (!first_name || !last_name || !email || !password || !avatar) {
    return res.status(400).json({
      status: "fail",
      message: "Missing required fields",
    });
  }
  const mimeType = avatar.mimetype.split("/")[1];
  const filename = avatar.filename;
  const filePath = path.resolve(__dirname, "../uploads", filename);

  const uploadResult = await cloudinary.uploader
    .upload(filePath, {
      filename_override: filename,
      folder: "visa_images",
      format: mimeType,
    })
    .catch((error) => {
      console.log(error);
    });

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
      avatar: uploadResult.secure_url,
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
