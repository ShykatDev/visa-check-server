const express = require("express");
const JobsController = require("../controllers/job.controller.js");
const commonController = require("../controllers/common.controller.js");

const router = express.Router();
const authRoutes = require("./auth.js");
const we = require('./we.js');

// Test route
router.get("/app", (req, res) => {
  res.json({
    message: "Welcome to the Visa Check Server",
  });
});

// Jobs routes
router.get("/jobs", JobsController.GetJobs);
router.post("/apply/:job_id", commonController.ApplyJob);

//Auth routes
router.use("/", authRoutes);

//Private routes
router.use('/we', we);

module.exports = router;
