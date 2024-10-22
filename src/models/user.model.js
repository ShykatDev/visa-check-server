const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
