const express = require("express");
const JobsController = require("../controllers/job.controller.js");
const commonController = require("../controllers/common.controller.js");

const router = express.Router();
const authRoutes = require("./auth.js");
const we = require('./we.js');
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
router.post("/apply/:job_id", upload.single("profile_pic"), commonController.ApplyJob);

//Auth routes
router.use("/", authRoutes);

//Private routes
router.use('/we', we);

module.exports = router;
