const path = require("path");
const cloudinary = require("../config/cloudinary.js");

const JobModel = require("../models/job.model.js");
const JobApplicationModel = require("../models/application.model.js");

// exports.ApplyJob = async (req, res) => {
//   const { hiring_position, vacancy, description, title, is_new } = req.body;
//   const { job_id } = req.params;

//   //   Checking for empty values
//   if (!title || !hiring_position || !vacancy || !description) {
//     return res.status(403).json({
//       status: "fail",
//       message: "Missing required fields",
//     });
//   }

//   try {
//     await JobModel.create({
//       title,
//       description,
//       vacancy,
//       hiring_position,
//       is_new,
//       job_id
//     });
//     return res.status(201).json({ status: "success" });
//   } catch (err) {
//     return res.status(500).json({ status: "fail", data: err.toString() });
//   }
// };

exports.ApplyJob = async (req, res) => {
  const {
    passport_number,
    phone_number,
    age,
    district,
    first_name,
    last_name,
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
    });
    return res.status(201).json({ status: "success" });
  } catch (err) {
    return res.status(500).json({ status: "fail", data: err.toString() });
  }
};
