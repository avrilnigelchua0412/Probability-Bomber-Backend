const AuthService = require("../services/AuthService");
const UserFactory = require('../factory/UserFactory');
const UserRepository = require("../repositories/UserRepository");
const { FieldValue } = require("firebase-admin/firestore");
const FirebaseService = require("../config/FirebaseService");
const EmailService = require("../services/EmailService")
class AuthController {
    static async register(req, res){
        try {
            const { name, email, password, role } = req.body;

            const createdAt = FieldValue.serverTimestamp();
            
            const userRecord = await AuthService.registerUser(email, password);
            
            const newUser = UserFactory.instantiateUser(userRecord.uid, name, email, createdAt, role);
            await UserRepository.createUser(userRecord.uid, newUser);
            res.status(201).send({ message: `${role} created successfully!` }); // 201 Created
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async login(req, res){
        try {
            const { role } = req.body;
            const userData = await UserRepository.getUserData(req.uid, role);
            console.log("Backend Token: ", req.token);
            console.log("Role: ", req.role);
            res.status(200).json({ message: "Login successful", userData: userData });
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

    static async resetPassword(req, res){
        try {
            const { newPassword } = req.body
            console.log('Sending password:', newPassword.password, typeof newPassword.password);

            const uid = req.uid; // Get the uid from the request object
            if (!uid) {
              return res.status(400).json({ error: "User ID not found" });
            }
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