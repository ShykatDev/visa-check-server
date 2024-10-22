const path = require("path");
const cloudinary = require("../config/cloudinary.js");
const UserDocumentModel = require("../models/user.visa.document.model.js");
const UserMedicalReportModel = require("../models/user.medical.report.model.js");

exports.CreateVisa = async (req, res) => {
  const { visa_number } = req.body;
  const visa_image = req.file;

  if (!visa_number || !visa_image) {
    return res
      .status(400)
      .json({ status: "fail", message: "Visa number and image are required" });
  }

  const mimeType = visa_image.mimetype.split("/")[1];
  const filename = visa_image.filename;
  const filePath = path.resolve(__dirname, "../uploads", filename);

  const uploadResult = await cloudinary.uploader
    .upload(filePath, {
      filename_override: filename,
      folder: "visa_images",
      format: mimeType,
    })
    .catch((error) => {
      console.log(error);
    });

  try {
    const userDocument = await UserDocumentModel.create({
      visa_number,
      visa_image: uploadResult.secure_url,
    });

    res.json({
      status: "success",
      message: "Visa information saved successfully",
      data: {
        visa_number: userDocument.visa_number,
        visa_image: userDocument.visa_image,
      },
    });
  } catch (error) {
    console.error("Error processing visa information:", error);
    res
      .status(500)
      .json({ status: "fail", message: "Error processing visa information" });
  }
};

exports.CreateMedicalReport = async (req, res) => {
  const { visa_number } = req.body;
  const medical_image = req.file;

  if (!visa_number || !medical_image) {
    return res.status(400).json({
      status: "fail",
      message: "Visa number and medical image are required",
    });
  }

  const mimeType = medical_image.mimetype.split("/")[1];
  const filename = medical_image.filename;
  const filePath = path.resolve(__dirname, "../uploads", filename);

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: filename,
      folder: "medical_images",
      format: mimeType,
    });

    const userMedicalReport = await UserMedicalReportModel.create({
      visa_number,
      medical_image: uploadResult.secure_url,
    });

    res.json({
      status: "success",
      message: "Medical report saved successfully",
      data: {
        visa_number: userMedicalReport.visa_number,
        medical_image: userMedicalReport.medical_image,
      },
    });
  } catch (error) {
    console.error("Error processing medical report:", error);
    res
      .status(500)
      .json({ status: "fail", message: "Error processing medical report" });
  }
};
