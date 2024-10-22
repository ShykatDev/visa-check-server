const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    vacancy: { type: Number, required: true },
    hiring_position: { type: String, required: true },
    is_new: { type: Boolean, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const JobModel = mongoose.model("Jobs", DataSchema);

module.exports = JobModel;
