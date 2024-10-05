// routes/images.js
const express = require("express");
const multer = require("multer");
const Image = require("../models/Image");
const router = express.Router();

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for uploading images
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const images = req.files.map((file) => ({
      data: file.buffer.toString("base64"), // Convert buffer to Base64
      contentType: file.mimetype, // Store file type
    }));

    const newImage = new Image({
      name: req.body.name, // Assume the name is passed in the body
      images: images,
    });

    await newImage.save();
    res.status(200).send({ message: "Image(s) uploaded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to upload image(s)" });
  }
});

// Route for retrieving images by ID
router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).send({ error: "Image not found" });
    }

    res.status(200).json({
      name: image.name,
      images: image.images.map((img) => ({
        data: img.data,
        contentType: img.contentType,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to retrieve image" });
  }
});

// Route to get all images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find({});
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching images." });
  }
});

module.exports = router;

module.exports = router;
