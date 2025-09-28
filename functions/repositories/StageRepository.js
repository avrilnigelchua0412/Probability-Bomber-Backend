const StageModel = require("../models/Stage/StageModel");
const FirebaseService = require("../config/FirebaseService");
const StaticVariable = require("../config/StaticVariable");

class StageRepository {
    static async createStage(stageData) {
        console.log("Stage data to be added:", stageData);
        if (stageData instanceof StageModel) {
            await FirebaseService.getDB().collection(StaticVariable.collectionStage).add(stageData.toFirestore());
        } else {
            throw new Error("Invalid stage data");
        }
    }
}
module.exports = StageRepository;