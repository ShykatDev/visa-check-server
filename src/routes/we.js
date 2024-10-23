const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const multer = require("multer");

const WeController = require("../controllers/we.controller.js");
const JobController = require("../controllers/job.controller.js");
const ApplicationController = require("../controllers/application.controller.js");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split(" ").join("-") + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// "/we/visa" route
router.post("/visa", upload.single("visa_image"), WeController.CreateVisa);
router.post("/jobs", JobController.CreateJob);

// "/we/medical_report" route
router.post(
  "/medical_report",
  upload.single("medical_image"),
  WeController.CreateMedicalReport
);

//Applications route
router.get("/applications", ApplicationController.GetApplication);

module.exports = router;
