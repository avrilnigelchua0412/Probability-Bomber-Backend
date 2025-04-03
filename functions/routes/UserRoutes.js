const express = require("express");
const UserController = require("../controllers/UserController");
// const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();
// router.get("/user-profile", authenticate, UserController.getUserProfile);
router.get("/user-profile", UserController.getUserProfile);

module.exports = router;