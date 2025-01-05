const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const multer = require("multer");

const WeController = require("../controllers/we.controller.js");
const JobController = require("../controllers/job.controller.js");
const ApplicationController = require("../controllers/application.controller.js");
const UserController = require("../controllers/user.controller.js");
const ComplainsController = require("../controllers/complains.controller.js");
const LifeSecurityController = require("../controllers/life.security.controller.js");
const OutpassController = require("../controllers/outpass.controller.js");

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

router.get("/", UserController.GetUser);

//Get Complains
router.get("/complains", ComplainsController.GetComplain);

//Get Life Securities
router.get("/life_securities", LifeSecurityController.GetLifeSecurity);
router.get("/out-pass", OutpassController.GetOutPass);

// "/we/visa" route
router.post("/visa", upload.single("visa_image"), WeController.CreateVisa);
router.post("/jobs", JobController.CreateJob);

// "/we/available-visa" route
router.post("/available-visa",upload.single("icon"), WeController.CreateAvailableVisa);

// "/we/medical_report" route
router.post(
  "/medical_report",
  upload.single("medical_image"),
  WeController.CreateMedicalReport
);

//Applications route
router.get("/applications", ApplicationController.GetApplication);

module.exports = router;
