const MedicalReportsModel = require("../models/user.medical.report.model.js");

exports.GetApplication = async (req, res) => {
  const { passport_number } = req.query;
  const query = passport_number ? { passport_number } : {};
  try {
    const results = await MedicalReportsModel.find(query);

    let data = {
      message: "Medical reports retrieved successfully",
      results,
    };

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
  }
};
