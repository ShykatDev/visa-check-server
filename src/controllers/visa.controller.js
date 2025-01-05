const AvailableVisaModel = require("../models/availableVisa.model.js");
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

exports.GetAvailVisa = async (req, res) => {
  try {
    const { country } = req.query;
    console.log(req.query, "country")
    let query = {};
    if (country) {
      // Filter by country if provided
      query.country = country;
    }
    const results = await AvailableVisaModel.find(query);

    let data = {
      message: "Visa  retrieved successfully",
      results,
    };

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
  }
};
