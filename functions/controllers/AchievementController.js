const AchievementService = require('../services/AchievementService');
const UserRepository = require("../repositories/UserRepository");

class AchievementController {
    static async addUserAchievement(req, res) {
        try {
            const { achievementList } = req.body;
            const userData = await UserRepository.getUserData(req.uid);
            const result = await AchievementService.addUserAchievementService(userData.username, achievementList, req.uid);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async getUserAchievement(req, res) {
        try {
            const userData = await UserRepository.getUserData(req.uid);
            const result = await AchievementService.getUserAchievementService(userData.username);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
module.exports = AchievementController;