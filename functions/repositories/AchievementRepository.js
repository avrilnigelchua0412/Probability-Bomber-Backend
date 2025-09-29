const FirebaseService = require("../config/FirebaseService");
const StaticVariable = require("../config/StaticVariable");
const AchievementModel = require("../models/Achievement/AchievementModel");
const { arrayUnion  } = require("firebase-admin/firestore");

class AchievementRepository {
    static async addUserAchievement(username, new_achievementList, uid, results) {
        try {
            const achievementsToAdd = results.map(item => item.achievements).flat();
            const combined_array = [...new Set([...achievementsToAdd, ...new_achievementList])];
            const newAcheivementdata = new AchievementModel(username, combined_array);
            await FirebaseService.getDB()
                .collection(StaticVariable.collectionAchievement)
                .doc(uid)
                .set(newAcheivementdata.toFirestore());
        } catch (err) {
            console.error('Failed to add achievements', err);
            throw err;
        }
    }

    static async createUserAchievement(username, achievementList) {
        const userAchievement = new AchievementModel(username, achievementList);
        await FirebaseService.getDB()
            .collection(StaticVariable.collectionAchievement)
            .add(userAchievement.toFirestore());
    }
    static async getUserAchievements(username) {
        return await FirebaseService.getDB()
            .collection(StaticVariable.collectionAchievement)
            .where("username", "==", username)
            .get();
    }
}

module.exports = AchievementRepository;