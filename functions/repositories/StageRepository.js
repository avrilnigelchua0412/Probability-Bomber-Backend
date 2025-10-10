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
    static async getAllStageDataByNumber(stageNumber) {
        const snapshot = await FirebaseService.getDB()
        .collection(StaticVariable.collectionStage)
        .where("stageNumber", "==", stageNumber)
        .get();
        if (!snapshot.empty) {
            const result = snapshot.docs.map(doc => doc.data());
            return result;
        } else {
            throw new Error("No stage data found for the given stage number.");
        }
    }
    static async getAllStageDataByUser(username) {
        const snapshot = await FirebaseService.getDB()
        .collection(StaticVariable.collectionStage)
        .where("username", "==", username)
        .get();
        if (!snapshot.empty) {
            const result = snapshot.docs.map(doc => doc.data());
            return result;
        } else {
            throw new Error("No stage data found for the given user.");
        }
    }
    static async findStageByUserAndScore(stageNumber, userName, score, duration) {
        const snapshot = await FirebaseService.getDB()
        .collection(StaticVariable.collectionStage)
        .where("stageNumber", "==", stageNumber)
        .where("username", "==", userName)
        .where("score", "==", score)
        .where("duration", "==", duration)
        .get();

        return !snapshot.empty; // true if duplicate exists
    }
    static async getAllStageData() {
        const snapshot = await FirebaseService.getDB()
        .collection(StaticVariable.collectionStage)
        .get();
        if (!snapshot.empty) {
            const result = snapshot.docs.map(doc => doc.data());
            return result;
        } else {
            throw new Error("No stage data found.");
        }
    }
}
module.exports = StageRepository;