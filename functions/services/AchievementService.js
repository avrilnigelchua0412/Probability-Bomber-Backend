const AchievementRepository = require("../repositories/AchievementRepository");

class AchievementService {
    static async addUserAchievementService(username, achievementList, uid) {
        const snapshot = await AchievementRepository.getUserAchievements(username);
        const result = snapshot.docs.map(doc=>doc.data())
        if (!snapshot) {
            await AchievementRepository.createUserAchievement(username, achievementList);
        } else {
            await AchievementRepository.addUserAchievement(username, achievementList, uid, result);
        }
    }
    static async getUserAchievementService(username) {
        const snapshot = await AchievementRepository.getUserAchievements(username);
        const result = snapshot.docs.map(doc=>doc.data())
        return result;
    }
}

module.exports = AchievementService;