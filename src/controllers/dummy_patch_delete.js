exports.PatchController = async (req, res) => {
  const { title, heading, description } = req.body;
  const { id } = req.params;

  if (!title || !heading || !description) {
    return res.status(403).json({
      status: "fail",
      message: "Missing required fields",
    });
  }

  try {
    await Model.findOneAndUpdate(
      // use original model here
      { _id: id }, // match id from param with database results id
      {
        title,
        heading,
        description,
        profile_pic: uploadResult.secure_url,
      } // update with new data
    );
    return res.status(201).json({ status: "success" });
  } catch (err) {
    return res.status(500).json({ status: "fail", data: err.toString() });
  }
};

exports.DeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    await Model.findOneAndDelete({ _id: id }); // same functionality from above findOneAndUpdate
    return res.status(204).json({
      status: "deleted",
    });
  } catch (err) {
    console.error("Error while delete skill", err);
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
