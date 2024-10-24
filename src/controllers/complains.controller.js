const ComplainModel = require("../models/complains.model.js");
const cloudinary = require("../config/cloudinary.js");
const path = require("path");

exports.CreateComplain = async (req, res) => {
  const {
    passport_number,
    phone_number,
    body,
    present_address,
    first_name,
    last_name,
    subject,
    country,
  } = req.body;

  const complain_img = req.file;
  let uploadResult;

  //   Checking for empty values
  if (
    !passport_number ||
    !phone_number ||
    !body ||
    !present_address ||
    !first_name ||
    !last_name ||
    !subject ||
    !country
  ) {
    return res.status(400).json({
      status: "failed",
      message: "Missing required fields",
    });
  }

  if (complain_img) {
    const mimeType = complain_img.mimetype.split("/")[1];
    const filename = complain_img.filename;
    const filePath = path.resolve(__dirname, "../uploads", filename);

    uploadResult = await cloudinary.uploader
      .upload(filePath, {
        filename_override: filename,
        folder: "complain_img",
        format: mimeType,
      })
      .catch((error) => {
        console.log(error);
      });
  }

  try {
    await ComplainModel.create({
      passport_number,
      phone_number,
      body,
      present_address,
      first_name,
      last_name,
      subject,
      country,
      complain_img: uploadResult?.secure_url || null,
    });
    return res.status(201).json({ status: "success" });
  } catch (err) {
    return res.status(500).json({ status: "fail", data: err.toString() });
  }
};

exports.GetComplain = async (req, res) => {
  try {
    const results = await ComplainModel.find();

    let data = {
      message: "Complains retrieved successfully",
      results,
    };

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
  }
};
