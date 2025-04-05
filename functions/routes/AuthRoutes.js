const express = require("express");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/forget_password", AuthController.forgetPassword);
router.post("/reset_password", AuthController.resetPassword);

module.exports = router;