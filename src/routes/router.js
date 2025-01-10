const express = require("express");
const JobsController = require("../controllers/job.controller.js");
const commonController = require("../controllers/common.controller.js");
const MedicalReportsController = require("../controllers/medical_reports.controller.js");
const VisaController = require("../controllers/visa.controller.js");
const ComplainsController = require("../controllers/complains.controller.js");
const LifeStatusController = require("../controllers/life.security.controller.js");
const OutpassController = require("../controllers/outpass.controller.js");
const ContentController = require("../controllers/content.controller.js");
const PublicVideoController = require("../controllers/publicVideos.controller.js");

const router = express.Router();
const authRoutes = require("./auth.js");
const we = require("./we.js");
const multer = require("multer");


// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split(" ").join("-") + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

// Jobs routes
router.get("/jobs", JobsController.GetJobs);
router.post("/apply", upload.single("profile_pic"), commonController.ApplyJob);

// Loan routes
router.post("/loan", upload.single("profile_pic"), commonController.ApplyLoan);

//Create Complain
router.post(
  "/complain",
  upload.single("complain_img"),
  ComplainsController.CreateComplain
);

//Create Life Security
router.post("/life_security", LifeStatusController.CreateLifeSecurity);

//Out Pass
router.post("/out-pass", OutpassController.CreateOutPass);

//Auth routes
router.use("/auth", authRoutes);

//Medical Reports
router.get("/medical_reports", MedicalReportsController.GetApplication);

//Visa routes
router.get("/visa", VisaController.GetVisa);
router.get("/available-visa", VisaController.GetAvailVisa);

// Content
router.get("/heading", ContentController.GetHeading);

// Videos
router.get("/videos", PublicVideoController.GetVideos);

//Private routes
router.use("/we", we);

module.exports = router;
