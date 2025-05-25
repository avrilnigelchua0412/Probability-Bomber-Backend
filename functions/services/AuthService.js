const firebaseService = require("../config/FirebaseService");
class AuthService {
    static async registerUser(email, password) {
        try {
            const auth = firebaseService.getAuth();
            const user = await auth.createUser({ email, password });
            return user;
        } catch (error) {
            console.error("registerUser error:", error);
            throw error;
        }
    }

    static async sendResetPassword(email) {
        try {
            const auth = firebaseService.getAuth();
            return await auth.generatePasswordResetLink(email);
        } catch (error) {
            console.error("sendResetPassword error:", error);
            throw error;
        }
    }

    static async updatePassword(uid, newPassword) {
        try {
            const auth = firebaseService.getAuth();
            const user = await auth.getUser(uid);
            console.log('User exists:', user.uid);

            await auth.updateUser(uid, { password: newPassword });
            console.log('Password updated successfully.');

            return true;
        } catch (error) {
            console.error("Error updating password:", error.message);
            return false;
        }
    }
}

module.exports = AuthService;