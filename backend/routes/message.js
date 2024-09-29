const express = require("express");
const mongoose = require("mongoose");
const Message = require("../models/message"); // Adjust the path based on your project structure

const router = express.Router();

// Function to generate trigrams
const generateTrigrams = (text) => {
  const trigrams = [];
  const normalizedText = text.toLowerCase().replace(/\s+/g, " "); // Normalize spaces and lowercase
  for (let i = 0; i < normalizedText.length - 2; i++) {
    trigrams.push(normalizedText.slice(i, i + 3)); // Extract trigram
  }
  return trigrams;
};

// API to search for messages based on user input
router.get("/search", async (req, res) => {
  const { q } = req.query;

  // Validate the query
  if (!q || q.trim().length === 0) {
    return res.status(400).json({ error: "Search query cannot be empty." });
  }

  try {
    // Generate trigrams for the search query
    const searchTrigrams = generateTrigrams(q);

    // Find all messages
    const messages = await Message.find({}).populate("sender receiver");

    // Filter messages based on trigram matches
    const filteredMessages = messages.filter((message) => {
      const messageTrigrams = generateTrigrams(message.content);
      // Check if any trigram from the search query exists in the message's trigrams
      return searchTrigrams.some((trigram) =>
        messageTrigrams.includes(trigram)
      );
    });

    // Sort messages by the number of matched trigrams
    filteredMessages.sort((a, b) => {
      const aMatches = generateTrigrams(a.content).filter((trigram) =>
        searchTrigrams.includes(trigram)
      ).length;
      const bMatches = generateTrigrams(b.content).filter((trigram) =>
        searchTrigrams.includes(trigram)
      ).length;
      return bMatches - aMatches; // Descending order
    });

    if (filteredMessages.length === 0) {
      return res.status(404).json({ message: "No messages found." });
    }

    res.json(filteredMessages);
  } catch (error) {
    console.error("Error searching messages:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching messages." });
  }
});

module.exports = router;
