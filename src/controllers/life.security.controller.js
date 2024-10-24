const LifeSecurityModel = require("../models/life.security.model.js");

exports.CreateLifeSecurity = async (req, res) => {
  const {
    first_name,
    last_name,
    passport_number,
    phone_number,
    present_address,
    country,
  } = req.body;

  //   Checking for empty values
  if (
    !passport_number ||
    !phone_number ||
    !present_address ||
    !first_name ||
    !last_name ||
    !country
  ) {
    return res.status(400).json({
      status: "failed",
      message: "Missing required fields",
    });
  }

  try {
    await LifeSecurityModel.create({
      first_name,
      last_name,
      passport_number,
      phone_number,
      present_address,
      country,
    });
    return res.status(201).json({ status: "success" });
  } catch (err) {
    return res.status(500).json({ status: "fail", data: err.toString() });
  }
};

exports.GetLifeSecurity = async (req, res) => {
  try {
    const results = await LifeSecurityModel.find();

    let data = {
      message: "Life Security retrieved successfully",
      results,
    };

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
  }
};
