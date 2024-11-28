const express = require("express");
const Tourpack = require("../models/Tourpack");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//Route 1: Get all the tourpacks using: GET "/api/tourpack/fetchtourpacks".No Login required
router.get("/fetchtourpacks", async (req, res) => {
  try {
    const tourpack = await Tourpack.find();
    res.json(tourpack);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 2: Add a new tourpacks using: POST "/api/tourpack/addtourpack". Login required
router.post(
  "/addtourpack",
  fetchuser,
  [body("title", "ENter a title please").isLength({ min: 3 })],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //If there are errors, return bad request and the errors

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Not Allowed." });
      }
      const tourpack = new Tourpack({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedTourpack = await tourpack.save();
      res.json(savedTourpack);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3: Update a existing tourpack using: PUT "/api/tourpack/updatetourpack". Login required
router.put("/updatetourpack/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    //create a newStatus object
    const newTourpack = {};
    if (title) {
      newTourpack.title = title;
    }
    if (description) {
      newTourpack.description = description;
    }
    if (tag) {
      newTourpack.tag = tag;
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Not Allowed." });
    }

    //Find the status to be update and update it
    let tourpack = await Tourpack.findById(req.params.id);
    if (!tourpack) {
      return res.status(400).send("Not found");
    }

    tourpack = await Tourpack.findByIdAndUpdate(
      req.params.id,
      { $set: newTourpack },
      { new: true }
    );
    res.json({ tourpack });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 4: Delete a existing tourpack using: DELETE "/api/tourpack/deletetourpack". Login required
router.delete("/deletetourpack/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Not Allowed." });
    }

    //Find the status to be deleted and delete it
    let tourpack = await Tourpack.findById(req.params.id);
    if (!tourpack) {
      return res.status(400).send("Not found");
    }

    tourpack = await Tourpack.findByIdAndDelete(req.params.id);
    res.json({ Success: "Package has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
