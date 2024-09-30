const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

// Saving a message
router.post("/", async (req, res) => {
  const { sender, receiver, content } = req.body;
  const message = new Message({ sender, receiver, content });
  await message.save();
  res.status(201).send(message);
});

// Retrieving messages
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
        msg.sender.toString() === userId ? msg.receiver : msg.sender;
      if (
        !latestMessages[otherUser._id] ||
        latestMessages[otherUser._id].timestamp < msg.timestamp
      ) {
        latestMessages[otherUser._id] = {
          user: otherUser,
          content: msg.content,
          timestamp: msg.timestamp,
        };
      }
    });

    res.send(Object.values(latestMessages));
  } catch (error) {
    res.status(500).send({ error: "Unable to retrieve participants" });
  }
});

module.exports = router;
