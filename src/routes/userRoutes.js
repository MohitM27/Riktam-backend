const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAdmin } = require("../middleware/isAdmin");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", isAdmin,userController.updateUser);
router.delete("/:id", isAdmin,userController.deleteUser);

module.exports = router;
