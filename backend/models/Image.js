// models/Image.js
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: String,
  images: [
    {
      data: String, // Base64-encoded string of the image
      contentType: String, // File type (e.g., 'image/jpeg')
    },
  ],
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
