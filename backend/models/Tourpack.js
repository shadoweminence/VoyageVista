const getTrigrams = (str) => {
  const processedStr = str.toLowerCase(); // Convert to lowercase for case-insensitivity
  const trigrams = [];
  for (let i = 0; i < processedStr.length - 2; i++) {
    trigrams.push(processedStr.slice(i, i + 3));
  }
  return trigrams;
};

const mongoose = require("mongoose");
const { Schema } = mongoose;

const TourpackSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    requied: false,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  trigrams: {
    type: [String],
    index: true, // Create an index on the trigrams field
  },
});

TourpackSchema.pre("save", function (next) {
  this.trigrams = getTrigrams(this.title);
  console.log("Generated trigrams:", this.trigrams); // Debug log
  next();
});

const tourpack = mongoose.model("tourpack", TourpackSchema);
module.exports = tourpack;
