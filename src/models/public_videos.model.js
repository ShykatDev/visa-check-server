const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
    {
        url: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const PublicVideos = mongoose.model("PublicVideo", DataSchema);

module.exports = PublicVideos;
