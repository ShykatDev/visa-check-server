const VisaModel = require("../models/user.visa.document.model.js");

exports.GetVisa = async (req, res) => {
  const { passport_number } = req.query;
  const query = passport_number ? { passport_number } : {};
  try {
    const results = await VisaModel.find(query);

    let data = {
      message: "Visa  retrieved successfully",
      results,
    };

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
  }
};
