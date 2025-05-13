const FirebaseService = require("../config/FirebaseService");
const StaticVariable = require("../config/StaticVariable");
const ClassRepository = require("./ClassRepository");
const QuizModel = require("../models/Quiz/QuizModel");
const UserRepository = require("../repositories/UserRepository");

class QuizRepository{
    static async getQuizDataByNameHelper(quizName){
        return await FirebaseService.getDB()
            .collection(StaticVariable.collectionQuiz)
            .where("quizName", "==", quizName)
            .limit(1)
            .get();
    }
    static async createQuiz(quizName, className, teacherUid){
        const quizNameQuery = await QuizRepository.getQuizDataByNameHelper(quizName);
        if(!quizNameQuery){
            throw new Error("Quiz Name already exists.");
        }
        const classId = await ClassRepository.getClassIdByName(className);
        const teacherData = await UserRepository.getUserData(teacherUid, StaticVariable.teacherRole);
        const teacherName = teacherData.name
        const quizRef = FirebaseService
            .getDB()
            .collection(StaticVariable.collectionQuiz)
            .doc();
        const quizModel = new QuizModel(quizRef.id, quizName, teacherName, [].push(classId));
        await quizRef.set(quizModel.toFirestore());
    }
    static async getQuizDocument(quizId){
        return FirebaseService.getDB().collection(StaticVariable.collectionQuiz).doc(quizId);
    }
    
}

module.exports = QuizRepository;