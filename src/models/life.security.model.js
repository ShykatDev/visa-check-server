// Name - Present Address - Number - Passport Number

const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: Number, required: true },
    present_address: { type: String, required: true },
    passport_number: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const InsuranceModel = mongoose.model("LifeSecurity", DataSchema);

module.exports = InsuranceModel;
