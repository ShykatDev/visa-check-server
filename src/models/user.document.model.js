const mongoose = require("mongoose");

const userDocumentSchema = mongoose.Schema(
  {
    visa_number: { type: String, required: true, unique: true },
    visa_image: { type: String, default: null },
    medical_image: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserDocumentModel = mongoose.model("UserDocument", userDocumentSchema);

module.exports = UserDocumentModel;
