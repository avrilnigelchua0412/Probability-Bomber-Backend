const UserRepository = require("../repositories/UserRepository");

class UserController {
    static async getUserProfile(req, res){
        try {
            const userData = await UserRepository.getUserData(req.uid, req.role);
            if (!userData) {
                throw new Error("User not found for UID: " + req.uid);
            }
            res.json({
                message: "Authenticated!",
                user: {
                    email: userData.email,
                    name: userData.name
                }
            });
        } catch (error) {
            console.error("Error fetching user profile:", error);
            res.status(500).json({ error: error?.message || "Internal server error" });
        }
    }
}

module.exports = UserController;