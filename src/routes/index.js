const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const groupRoutes = require("./groupRoutes");
const messageRoutes = require("./messageRoutes");

router.use("/auth", authRoutes);
router.use("/users", authenticateToken, userRoutes);
router.use("/groups", authenticateToken, groupRoutes);
router.use("/messages", authenticateToken, messageRoutes);
module.exports = router;
