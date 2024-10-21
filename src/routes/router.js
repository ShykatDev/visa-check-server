const express = require("express");
const JobsController = require("../controllers/job.controller.js");

const router = express.Router();

// Test route
router.get("/app", (req, res) => {
  res.json({
    message: "Welcome to the Visa Check Server",
  });
});

// Jobs routes
router.get("/jobs", JobsController.GetJobs);
router.post("/job", JobsController.CreateJob);

module.exports = router;
