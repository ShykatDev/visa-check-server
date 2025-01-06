const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
    {
        heading: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const HeadingModel = mongoose.model("Heading", DataSchema, "Heading");

module.exports = HeadingModel;
