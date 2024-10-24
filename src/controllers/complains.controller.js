const MedicalReportsModel = require("../models/complains.model.js");

exports.CreateComplain = async (req, res) => {
  const {
    passport_number,
    phone_number,
    body,
    present_address,
    first_name,
    last_name,
    subject,
  } = req.body;

  //   Checking for empty values
  if (
    !passport_number ||
    !phone_number ||
    !body ||
    !present_address ||
    !first_name ||
    !last_name ||
    !subject
  ) {
    return res.status(400).json({
      status: "failed",
      message: "Missing required fields",
    });
  }

  try {
    await MedicalReportsModel.create({
      passport_number,
      phone_number,
      body,
      present_address,
      first_name,
      last_name,
      subject,
    });
    return res.status(201).json({ status: "success" });
  } catch (err) {
    return res.status(500).json({ status: "fail", data: err.toString() });
  }
};

exports.GetComplain = async (req, res) => {
  try {
    const results = await MedicalReportsModel.find();

    let data = {
      message: "Applications retrieved successfully",
      results,
    };

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
  }
};
