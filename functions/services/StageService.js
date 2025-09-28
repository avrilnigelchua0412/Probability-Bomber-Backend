const StageModel = require("../models/Stage/StageModel");
const StageRepository = require("../repositories/StageRepository");

class StageService {
    static async createStageService(score, duration, numberOfStars, userName) {
        const stageData = new StageModel(userName, score, duration, numberOfStars);
        await StageRepository.createStage(stageData);
    }
}
module.exports = StageService;