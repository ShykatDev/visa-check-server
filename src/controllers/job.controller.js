const JobModel = require("../models/job.model.js");

exports.GetJobs = async (req, res) => {
  try {
    const results = await JobModel.find();

    let data = {
      message: "Job retrieved successfully",
      results,
    };

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
  }
};

exports.CreateJob = async (req, res) => {
  const { hiring_position, vacancy, description, title, is_new } = req.body;

  //   Checking for empty values
  if (!title || !hiring_position || !vacancy || !description) {
    return res.status(403).json({
      status: "fail",
      message: "Missing required fields",
    });
  }

  try {
    await JobModel.create({
      title,
      description,
      vacancy,
      hiring_position,
      is_new,
    });
    return res.status(201).json({ status: "success" });
  } catch (err) {
    return res.status(500).json({ status: "fail", data: err.toString() });
  }
};
