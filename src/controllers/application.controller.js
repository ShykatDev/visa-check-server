const ApplicationModel = require("../models/application.model.js");

exports.GetApplication = async (req, res) => {
  const { passport_number } = req.query;
  const query = passport_number ? { passport_number } : {};
  try {
    const results = await ApplicationModel.find(query)
      .populate({
        path: "job_id",
        select: "title -_id",
      })
      .populate({
        path: "visa_id",
        select: "title -_id",
      })
      .exec();

    let data = {
      message: "Applications retrieved successfully",
      results,
    };

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
  }
};
