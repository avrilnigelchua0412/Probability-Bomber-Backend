const UserRepository = require("../repositories/UserRepository");
const StageService = require("../services/StageService");

class StageController {
    static async addStageInformation(req, res) {
        try {
            const { stageNumber, score, duration, numberOfStars } = req.body;
            const userData = await UserRepository.getUserData(req.uid);
            await StageService.createStageService(stageNumber, score, duration, numberOfStars, userData.username);            
            res.status(200).json({ message: "Added user's stage information successfully!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getSpecificStageInformation(req, res) {
        try {
            const { stageNumber } = req.body;
            const stageData = await StageService.getStageData(stageNumber);
            res.status(200).json({ stageData: stageData });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getGlobalStageInformation(req, res) {
        try {
            const stageData = await StageService.getAllStageData();
            res.status(200).json({ message: stageData });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getAUserStageInformation(req, res) {
        try {
            const userData = await UserRepository.getUserData(req.uid);
            const username = userData.username;
            const userStageData = await StageService.getUserStageData(username);
            res.status(200).json({ userStageData: userStageData });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = StageController;