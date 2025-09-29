const StageModel = require("../models/Stage/StageModel");
const StageRepository = require("../repositories/StageRepository");
const { FieldValue } = require("firebase-admin/firestore");

class StageService {
    static async createStageService(stageNumber, score, duration, numberOfStars, userName) {
        // Check if duplicate exists
        const exists = await StageRepository.findStageByUserAndScore(stageNumber, userName, score, duration);
        if (exists) {
            throw new Error("Stage entry already exists for this user.");
        }
        const createdAt = FieldValue.serverTimestamp();
        const stageData = new StageModel(userName, stageNumber, score, duration, numberOfStars, createdAt);
        await StageRepository.createStage(stageData);
    }
    static async getStageData(stageNumber) {
        return await StageRepository.getAllStageDataByNumber(stageNumber);
    }
    static async getAllStageData() {
        return await StageRepository.getAllStageData();
    }
    static async getUserStageData(username) {
        return await StageRepository.getAllStageDataByUser(username);
    }
}
module.exports = StageService;