const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/:groupId", messageController.getMessagesByGroup);
router.post("/:groupId", messageController.createMessage);
router.put("/:id/like", messageController.likeMessage);
router.delete("/:id", messageController.deleteMessage);

module.exports = router;
