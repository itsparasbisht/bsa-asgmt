const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GhgEmissionSchema = new Schema(
  {
    country: String,
    year: String,
    value: Number,
    parameter: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ghg-emissions", GhgEmissionSchema);
