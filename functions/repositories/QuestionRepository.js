const FirebaseService = require("../config/FirebaseService");
const StaticVariable = require("../config/StaticVariable");
const QuestionModel = require("../models/Question/QuestionModel");
const QuizRepository = require("./QuizRepository");

class QuestionRepository{
    static async createQuestion(questionName, questionDescription, numerator, denominator){
        const questionRef = FirebaseService.getDB().collection(StaticVariable.collectionQuestion).doc();
        const questionModel = new QuestionModel(questionRef.id, questionName, questionDescription, numerator, denominator);
        await questionRef.set(questionModel.toFirestore());
    }
    static async editQuestion(questionName, questionDescription, numerator, denominator){
        const questionId = await QuestionRepository.getQuestionIdByName(questionName);
        const questionRef = await FirebaseService.getRef(StaticVariable.collectionQuestion, questionId);
        const questionModel = new QuestionModel(questionRef.id, questionName, questionDescription, numerator, denominator);
        await questionRef.update(questionModel.toFirestore());
    }
    static async getQuestionDataByNameHelper(questionName){
        return await FirebaseService.getDB()
            .collection(StaticVariable.collectionQuestion)
            .where("questionName", "==", questionName)
            .limit(1)
            .get();
    }
    static async getQuestionIdByName(questionName){
        const questionNameQuery = await QuestionRepository.getQuestionDataByNameHelper(questionName);
        if(questionNameQuery.empty) throw new Error("No Question Name found.");
        return questionNameQuery.docs[0].id;
    }
    static async removeQuestion(questionName){
        const questionId = await QuestionRepository.getQuestionIdByName(questionName);
        const questionRef = await FirebaseService.getRef(StaticVariable.collectionQuestion, questionId);
        await questionRef.delete();
    }
    static async getQuestionSnapshot(){
        return await FirebaseService.getDB().collection(StaticVariable.collectionQuestion).get();
    }
}

module.exports = QuestionRepository;