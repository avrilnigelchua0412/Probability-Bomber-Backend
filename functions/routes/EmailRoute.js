const express = require("express");
const router = express.Router();
const EmailController = require("../controllers/EmailController");

// POST /api/email/send-code
router.post("/send-code", EmailController.sendVerificationCode);

module.exports = router;
