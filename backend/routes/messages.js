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

router.post("/update-unread-messages", async (req, res) => {
  const { receiverId, senderId } = req.body;
  try {
    // Mark the messages as read when the receiver sees them
    await Message.updateMany(
      { receiver: receiverId, sender: senderId, isRead: false },
      { $set: { isRead: true } }
    );
    res.send({ message: "Unread messages updated successfully" });
  } catch (error) {
    console.error("Error updating unread messages:", error);
    res.status(500).send({ error: "Failed to update unread messages" });
  }
});

module.exports = router;
