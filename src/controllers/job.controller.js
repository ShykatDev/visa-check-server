const JobModel = require("../models/job.model.js");

exports.GetJobs = async (req, res) => {
  try {
    let data = {
      message: "Job get successfully",
    };

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
  }
};

exports.CreateJob = async (req, res) => {
  const { hiring_position, vacancy, description, title } = req.body;

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
    });
    return res.status(201).json({ status: "success" });
  } catch (err) {
    return res.status(500).json({ status: "fail", data: err.toString() });
  }
};
