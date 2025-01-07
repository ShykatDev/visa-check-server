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
        loan_amount: { type: String, required: true },
        income: { type: String, required: true },
        purpose: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const LoanApplicationModel = mongoose.model("LoanApplication", DataSchema);

module.exports = LoanApplicationModel;
