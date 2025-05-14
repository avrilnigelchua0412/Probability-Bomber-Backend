const StaticVariable = require("../config/StaticVariable");
const ClassRepository = require("../repositories/ClassRepository");
const QuizRepository = require("../repositories/QuizRepository");
const UserRepository = require("../repositories/UserRepository");

class QuizService {
    static async createQuizService(quizName, teacherUid){
        const quizNameQuery = await QuizRepository.getQuizDataByNameHelper(quizName);
        if (!quizNameQuery.empty) {
            throw new Error("Quiz Name already exists.");
        }
        const teacherData = await UserRepository.getUserData(teacherUid, StaticVariable.teacherRole);
        const teacherName = teacherData.name
        return await QuizRepository.createQuiz(quizName, teacherName);
    }
    static async deleteClassOnQuizService(quizName, className) {
        const quizId = await QuizRepository.getQuizIdByName(quizName);
        const classId = await ClassRepository.getClassIdByName(className);
        await QuizRepository.deleteClassOnQuiz(quizId, classId);
        await QuizRepository.removeClassEntry(quizId, classId);
    }
}
module.exports = QuizService;