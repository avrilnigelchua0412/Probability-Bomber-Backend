const nodemailer = require("nodemailer");
require("dotenv").config();

const EmailController = {
    async sendVerificationCode(req, res) {
        const { email } = req.body;
        const code = Math.floor(100000 + Math.random() * 900000); // 6-digit random code

        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Your Verification Code",
                text: `Your verification code is: ${code}`,
            };

            await transporter.sendMail(mailOptions);

            // you could also store this code in your DB or session
            res.json({ success: true, message: "Verification code sent!", code });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to send email" });
        }
    }
};

module.exports = EmailController;
