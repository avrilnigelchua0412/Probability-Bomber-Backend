const jwt = require("jsonwebtoken");
const { getAuth } = require("firebase-admin/auth");

class AuthService {
    static async registerUser(email, password) {
        return await getAuth().createUser({ email, password });
    }

    static async generateToken(uid){
        return jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: "1h" });
    }
    
    static async sendResetPassword(email) {
        return await getAuth().generatePasswordResetLink(email);
    }
}

module.exports = AuthService;