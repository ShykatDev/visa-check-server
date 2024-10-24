const path = require("path");
const cloudinary = require("../config/cloudinary.js");

const JobApplicationModel = require("../models/application.model.js");


exports.ApplyJob = async (req, res) => {
  const {
    passport_number,
    phone_number,
    age,
    district,
    first_name,
    last_name,
    visa_id
  } = req.body;
  const { job_id } = req.params;
  const profile_pic = req.file;

  //   Checking for empty values
  if (
    !profile_pic ||
    !passport_number ||
    !phone_number ||
    !age ||
    !district ||
    !first_name ||
    !last_name ||
    !job_id
  ) {
    return res.status(400).json({
      status: "failed",
      message: "Missing required fields",
    });
  }

  const mimeType = profile_pic.mimetype.split("/")[1];
  const filename = profile_pic.filename;
  const filePath = path.resolve(__dirname, "../uploads", filename);
  const uploadedResult = await cloudinary.uploader
    .upload(filePath, {
      filename_override: filename,
      folder: "Profile_Pic",
      format: mimeType,
    })
    .catch((error) => {
      console.log(error);
    });

  try {
    await JobApplicationModel.create({
      profile_pic: uploadedResult.secure_url,
      passport_number,
      phone_number,
      age,
      district,
      first_name,
      last_name,
      job_id,
      visa_id
    });
    return res.status(201).json({ status: "success" });
  } catch (err) {
    return res.status(500).json({ status: "fail", data: err.toString() });
  }
};
