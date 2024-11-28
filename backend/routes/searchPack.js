const express = require("express");
const Tourpack = require("../models/Tourpack"); // User model with trigrams
const router = express.Router();

// Function to get trigrams from a string
const getTrigrams = (str) => {
  const processedStr = str.toLowerCase();
  const trigrams = [];
  for (let i = 0; i < processedStr.length - 2; i++) {
    trigrams.push(processedStr.slice(i, i + 3));
  }
  return trigrams;
};

// Function to calculate the trigram match score
const calculateTrigramMatchScore = (queryTrigrams, tourpackTrigrams) => {
  const commonTrigrams = queryTrigrams.filter((trigram) =>
    tourpackTrigrams.includes(trigram)
  );
  // Normalize the trigram match score by dividing by the total number of trigrams in the query
  return commonTrigrams.length / queryTrigrams.length;
};

// Function to calculate the exact match score
const calculateExactMatchScore = (query, title) => {
  return title.toLowerCase() === query.toLowerCase() ? 10 : 0; // Higher score for exact matches
};

// Search users based on trigrams (GET version)
router.get("/search", async (req, res) => {
  const query = req.query.q; // Get search query from query parameter

  if (!query || query.length < 3) {
    return res.status(400).json({ error: "Query too short." });
  }

  const queryTrigrams = getTrigrams(query);

  try {
    // Find users whose trigrams match any of the search query's trigrams
    let tourpacks = await Tourpack.find({
      trigrams: { $in: queryTrigrams },
    });

    if (tourpacks.length === 0) {
      return res.status(404).json({ message: "No packs found." });
    }

    // Add scores to each user
    tourpacks = tourpacks.map((tourpack) => {
      const trigramMatchScore = calculateTrigramMatchScore(
        queryTrigrams,
        tourpack.trigrams
      );
      const exactMatchScore = calculateExactMatchScore(query, tourpack.title);
      return {
        ...tourpack._doc, // Spread user object
        matchScore: trigramMatchScore + exactMatchScore,
      };
    });

    // Sort users by matchScore, descending
    tourpacks.sort((a, b) => b.matchScore - a.matchScore);

    res.json(tourpacks);
  } catch (error) {
    res.status(500).json({ error: "Error during search" });
  }
});

module.exports = router;
