const UserRepository = require("../repositories/UserRepository");
const StageService = require("../services/StageService");

class StageController {
    static async addStageInformation(req, res) {
        try {
            const { score, duration, numberOfStars } = req.body;
            const userData = await UserRepository.getUserData(req.uid);
            // username = userData["username"]
            await StageService.createStageService(score, duration, numberOfStars, userData.username);            
            res.status(200).json({ message: "Added user's stage information successfully!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = StageController;