const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");

router.post("/login", authController.login);
router.post("/register",authenticateToken,isAdmin, authController.register);
router.post("/logout",authenticateToken, authController.logout);

module.exports = router;
