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

    static async login(req, res){
        try {
            const { email } = req.body;
            const userRecord = await getAuth().getUserByEmail(email);
            const token = await AuthService.generateToken(userRecord.uid);

            res.status(200).json({ message : "Login successful", token : token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async forgetPassword(req, res) {
        try {
            const { email } = req.body;
            const resetLink = await AuthService.sendResetPassword(email);

            res.status(200).json({ message: "Password reset email sent successfully.", resetLink });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = AuthController;