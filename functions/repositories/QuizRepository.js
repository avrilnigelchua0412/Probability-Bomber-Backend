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
    static async createQuiz(quizName, teacherName){
        const quizRef = FirebaseService
            .getDB()
            .collection(StaticVariable.collectionQuiz)
            .doc();
        const quizModel = new QuizModel(quizRef.id, quizName, teacherName);
        await quizRef.set(quizModel.toFirestore());
    }

    static async deleteClassOnQuiz(quizId, classId) {
        const quizRef = FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        await quizRef.update({
            classIds: FirebaseService.getFieldValue().arrayRemove(classId)
        });
    }

    static async addClassOnQuiz(quizId, classId) {
        const quizRef = FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        await quizRef.update({
            classIds: FirebaseService.getFieldValue().arrayUnion(classId)
        });
    }
    
    static async deleteQuestionOnQuiz(quizId, questionId){
        const quizRef = FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        await quizRef.update({
            questions: FirebaseService.getFieldValue().arrayRemove(questionId)
        });
    }
    static async addQuestionOnQuiz(quizId, questionId){
        const quizRef = FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        await quizRef.update({
            questions: FirebaseService.getFieldValue().arrayUnion(questionId)
        });
    }

    static async getQuizIdByName(quizName){
        const quizNameQuery = await QuizRepository.getQuizDataByNameHelper(quizName);
        if(quizNameQuery.empty) throw new Error("No Quiz Name found.");
        return quizNameQuery.docs[0].id;
    }

    // Update score of a student
    static async updateStudentScore(quizId, classId, studentUid, score) {
        const path = `studentScores.${classId}.${studentUid}`;
        const quizRef = FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        await quizRef.update({ [path]: score });
    }

    // Add a new class score entry
    static async addClassEntry(quizId, classId) {
        const path = `studentScores.${classId}`;
        const quizRef = FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        await quizRef.update({ [path]: {} });
    }

    // Remove a student's score
    static async removeStudentScore(quizId, classId, studentUid) {
        const path = `studentScores.${classId}.${studentUid}`;
        const quizRef = FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        await quizRef.update({ [path]: FirebaseService.getFieldValue().delete() });
    }

    // Remove entire class's scores
    static async removeClassEntry(quizId, classId) {
        const path = `studentScores.${classId}`;
        const quizRef = FirebaseService.getRef(StaticVariable.collectionQuiz, quizId);
        await quizRef.update({ [path]: FirebaseService.getFieldValue().delete() });
    }
}

module.exports = QuizRepository;