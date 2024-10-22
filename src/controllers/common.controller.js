const JobModel = require("../models/job.model.js");

exports.ApplyJob = async (req, res) => {
  const { hiring_position, vacancy, description, title, is_new } = req.body;
  const { job_id } = req.params;

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
      job_id
    });
    return res.status(201).json({ status: "success" });
  } catch (err) {
    return res.status(500).json({ status: "fail", data: err.toString() });
  }
};
