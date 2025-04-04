const jwt = require("jsonwebtoken");
const { getAuth } = require("firebase-admin/auth");
const admin = require('firebase-admin');

class AuthService {
    static async registerUser(email, password) {
        return await getAuth().createUser({ email, password });
    }
    // static async loginUser(email, password) {
    //     await getAuth().getUserByEmail(email);
    //     await admin.auth().signInWithEmailAndPassword(email, password);
    //     throw new Error("Login failed!"); // Throwing error to be caught in controller
    // }
    // static async generateToken(uid){
    //     return jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: "1h" });
    // }
    
    static async sendResetPassword(email) {
        return await getAuth().generatePasswordResetLink(email);
    }

    static async updatePassword(uid, newPassword) {
        try {
          // Attempt to update the password for the given user ID

        const user = await admin.auth().getUser(uid);
        console.log('User exists:', user);

        // Update the user's password
        await admin.auth().updateUser(uid, { password: newPassword });
        console.log('Password updated successfully.');

        return true;
        } catch (error) {
        console.error("Error updating password:", error.message);
          // If there's an error, return false indicating failure
        return false;
        }
      }
}

module.exports = AuthService;