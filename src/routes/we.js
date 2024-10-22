const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const UserDocumentModel = require("../models/user.document.model.js");
const uploadImage = require("../utils/uploadImage.js");
const multer = require("multer");
const upload = multer();

const router = express.Router();

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// "/we/visa" route
router.post("/visa", upload.single("visa_image"), async (req, res) => {
  const { visa_number } = req.body;
  const  visa_image  = req.file;

  if (!visa_number || !visa_image) {
    return res
      .status(400)
      .json({ status: "fail", message: "Visa number and image are required" });
  }

  try {
    const imageUrl = await uploadImage(visa_image, "visa_images");

    const userDocument = await UserDocumentModel.findOneAndUpdate(
      { visa_number },
      { visa_image: imageUrl },
      { upsert: true, new: true }
    );

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
});

// "/we/medical_report" route
router.post(
  "/medical_report",
  upload.single("medical_image"),
  async (req, res) => {
    const { visa_number } = req.body;
    const medical_image = req.file;

    if (!visa_number || !medical_image) {
      return res
        .status(400)
        .json({
          status: "fail",
          message: "Visa number and medical image are required",
        });
    }

    try {
      const imageUrl = await uploadImage(medical_image, "medical_images");

      const userDocument = await UserDocumentModel.findOneAndUpdate(
        { visa_number },
        { medical_image: imageUrl },
        { upsert: true, new: true }
      );

      res.json({
        status: "success",
        message: "Medical report saved successfully",
        data: {
          visa_number: userDocument.visa_number,
          medical_image: userDocument.medical_image,
        },
      });
    } catch (error) {
      console.error("Error processing medical report:", error);
      res
        .status(500)
        .json({ status: "fail", message: "Error processing medical report" });
    }
  }
);

module.exports = router;
