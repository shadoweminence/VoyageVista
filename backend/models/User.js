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

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
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

// Middleware to generate trigrams before saving
UserSchema.pre("save", function (next) {
  this.trigrams = getTrigrams(this.name); // Generate trigrams for the name
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
