const mongoose = require("mongoose");

const userMedicalReportsSchema = mongoose.Schema(
  {
    visa_number: { type: String, required: true, },
    medical_image: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserMedicalReportModel = mongoose.model("UserMedicalReport", userMedicalReportsSchema);

module.exports = UserMedicalReportModel;
