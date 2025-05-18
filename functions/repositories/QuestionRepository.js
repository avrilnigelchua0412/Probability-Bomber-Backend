const FirebaseService = require("../config/FirebaseService");
const StaticVariable = require("../config/StaticVariable");
const CreateQuestionDTO = require("../dto/CreateQuestionDTO");
const EditQuestionDTO = require("../dto/EditQuestionDTO");
const QuestionModel = require("../models/Question/QuestionModel");
const QuizRepository = require("./QuizRepository");
const UserRepository = require("./UserRepository");

class QuestionRepository{
    static async createQuestion(createQuestionDTO){
        if(createQuestionDTO instanceof CreateQuestionDTO){
            const questionRef = FirebaseService.getDB().collection(StaticVariable.collectionQuestion).doc();
            createQuestionDTO.setQuestionId(questionRef.id);
            const questionModel = createQuestionDTO.toQuestionModel()
            await questionRef.set(questionModel.toFirestore());
        }
    }
    static async editQuestion(editQuestionDTO){
        if(editQuestionDTO instanceof EditQuestionDTO){
            const questionId = await QuestionRepository.getQuestionIdByName(editQuestionDTO.originalQuestionName);
            editQuestionDTO.setQuestionId(questionId)
            const questionRef = await FirebaseService.getRef(StaticVariable.collectionQuestion, questionId);
            const questionModel = editQuestionDTO.toQuestionModel()
            await questionRef.update(questionModel.toFirestore());
        }
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