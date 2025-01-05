const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
        title: { type: String, required: true },
        country:{ type:String, required: true, default: ""},
        icon: { type:String, default: null},
        description: {type: String, required: true}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AvailableVisa = mongoose.model("avaiiablevisa", DataSchema);

module.exports = AvailableVisa;
