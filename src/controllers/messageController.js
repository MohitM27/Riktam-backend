const Message = require("../models/message");

exports.getMessagesByGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    // Validate groupId
    if (!groupId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid group ID" });
    }
    const messages = await Message.find({ group: groupId });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    // Validate groupId
    if (!groupId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid group ID" });
    }
    req.body.group = groupId;
    req.body.author = req.user.id; // Assuming authenticated user ID is in req.user.id
    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.likeMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    // Validate messageId
    if (!messageId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid message ID" });
    }
    const userId = req.user.id; // Assuming authenticated user ID is in req.user.id
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    if (!message.likes.includes(userId)) {
      message.likes.push(userId);
      await message.save();
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    // Validate messageId
    if (!messageId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid message ID" });
    }
    await Message.findByIdAndDelete(messageId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
