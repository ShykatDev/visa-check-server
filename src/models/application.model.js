const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    district: { type: String, required: true },
    profile_pic: { type: String, required: true },
    age: { type: Number, required: true },
    phone_number: { type: Number, required: true },
    passport_number: { type: String, required: true },
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Jobs",
    },
    visa_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "avaiiablevisa",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const JobApplicationModel = mongoose.model("Application", DataSchema);

module.exports = JobApplicationModel;
