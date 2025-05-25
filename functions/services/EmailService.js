require('dotenv').config();  // Load .env variables at the very top

const nodemailer = require("nodemailer");

class EmailService {
    static async sendVerificationEmail(to, link){
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Group 18" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Verify your email",
            html: `<p>Click the link below to verify your email:</p>
                    <p><a href="${link}" target="_blank" rel="noopener noreferrer">Verify Email</a></p>`
        };

        await transporter.sendMail(mailOptions);
    }
}

module.exports = EmailService;