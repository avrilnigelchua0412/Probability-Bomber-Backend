const UserRepository = require("../repositories/UserRepository");

class UserController {
    static async getUserProfile(req, res){
        try {
            console.log("UID: ", req.uid);
            const userData = await UserRepository.getUserData(req.uid);

            if(!userData){
                // Enclosed in a if block, since "res" is not detected as Response Object
                if(res instanceof Response){
                    return res.status(404).json({ error: "User not found" });
                }
                throw "Not a response?";
            }
            /*
            To be changed!
            Need a "proper" profile..?
            */
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