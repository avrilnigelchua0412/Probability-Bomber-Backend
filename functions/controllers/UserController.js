const UserRepository = require("../repositories/UserRepository");

class UserController {
    static async getUserProfile(req, res){
        try {
            const userData = await UserRepository.getUserData(req.uid);

            if(!userData){
                if(res instanceof Response){
                    return res.status(404).json({ error: "User not found" });
                }
                throw "Not a response?";
            }
            res.json({
                message: "Authenticated!",
                user: {
                    email: userData.email,
                    name: userData.name
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;