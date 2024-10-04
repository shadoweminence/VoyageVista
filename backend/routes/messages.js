const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

// Save a message
router.post("/", async (req, res) => {
  const { sender, receiver, content } = req.body;
  const message = new Message({ sender, receiver, content });
  await message.save();
  res.status(201).send(message);
});

// Retrieve all participants with the latest message
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender receiver", "name") // Assuming sender and receiver have a name field
      .sort({ timestamp: -1 }); // Sort by latest message

    const latestMessages = {};

    messages.forEach((msg) => {
      const otherUser =
        msg.sender._id.toString() === userId ? msg.receiver : msg.sender;

      // Check if the current message's timestamp is newer than the existing one
      if (
        !latestMessages[otherUser._id] ||
        latestMessages[otherUser._id].timestamp < msg.timestamp
      ) {
        // Format the message content
        const formattedContent =
          msg.sender._id.toString() === userId
            ? `You: ${msg.content}` // Add 'You:' if the user sent the message
            : msg.content; // Otherwise, just the message

        latestMessages[otherUser._id] = {
          user: otherUser,
          content: formattedContent, // Use the formatted content
          timestamp: msg.timestamp,
          isSentByUser: msg.sender._id.toString() === userId, // Track if the message was sent by the logged-in user
        };
      }
    });

    res.send(Object.values(latestMessages));
  } catch (error) {
    console.error("Error fetching latest messages:", error);
    res.status(500).send({ error: "Unable to retrieve participants" });
  }
});

// Retrieve specific conversation between two users
router.get("/:userId/:otherUserId", async (req, res) => {
  const { userId, otherUserId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    })
      .sort({ timestamp: 1 }) // Sort by oldest to newest
      .populate("sender receiver", "name"); // Populate sender and receiver with names

    res.send(messages);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Unable to retrieve messages between users" });
  }
});

module.exports = router;
