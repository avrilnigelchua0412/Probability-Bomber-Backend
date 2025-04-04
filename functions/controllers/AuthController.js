const AuthService = require("../services/AuthService");
const UserModel = require("../models/UserModel");
const UserRepository = require("../repositories/UserRepository");
const { FieldValue } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");

class AuthController {
    static async register(req, res){
        try {
            const { name, email, password } = req.body;
            const createdAt = FieldValue.serverTimestamp();

            const userRecord = await AuthService.registerUser(email, password);
            const newUser = new UserModel(userRecord.uid, name, email, createdAt);

            await UserRepository.createUser(userRecord.uid, newUser);
            res.status(201).send({ message: "User created successfully!" }); // 201 Created
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    // static async login(req, res){
    //     try {
    //         const { email, password } = req.body;
    //         await AuthService.loginUser(email, password);
    //         const token = await AuthService.generateToken(userRecord.uid);
    //         console.log("Login successful, Token:", token);
    //         res.status(200).json({ message: "Login successful", token: token });
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }

    static async forgetPassword(req, res) {
        try {
            const { email } = req.body;
            const resetLink = await AuthService.sendResetPassword(email);

            res.status(200).json({ message: "Password reset email sent successfully.", resetLink });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async resetPassword(req, res){
        try {
            const { newPassword } = req.body
            // Dependency Injection
            console.log("UID: ", req.uid);
            const result = await AuthService.updatePassword(req.uid, newPassword);
            if (result) {
                res.status(200).json({ message: "Password updated successfully!" });
              } else {
                res.status(400).json({ error: "Failed to update password" });
              }
        } catch (error) {
            res.status(500).send({ error: error.message }); 
        }
    }
}

module.exports = AuthController;