const StaticVariable = require("../config/StaticVariable");
const ClassRepository = require("../repositories/ClassRepository");
const HelperRepository = require("../repositories/HelperRepository");
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

    static async addClassOnQuizService(quizName, className){
        const quizId = await QuizRepository.getQuizIdByName(quizName);
        const classId = await ClassRepository.getClassIdByName(className);
        await QuizRepository.addClassOnQuiz(quizId, classId);
        await QuizRepository.addClassEntry(quizId, classId);
    }

    static async deleteClassOnQuizService(quizName, className) {
        const quizId = await QuizRepository.getQuizIdByName(quizName);
        const classId = await ClassRepository.getClassIdByName(className);
        await QuizRepository.deleteClassOnQuiz(quizId, classId);
        await QuizRepository.removeClassEntry(quizId, classId);
    }

    static async updateStudentScoreService(quizName, className, studentName, score){
        const {quizId, classId, studentUid } = await HelperRepository.getQuizIdClassIdStudentUid(quizName, className, studentName);
        await QuizRepository.updateStudentScore(quizId, classId, studentUid, score)
    }
    static async removeStudentScoreService(quizName, className, studentName){
        const { quizId, classId, studentUid } = await HelperRepository.getQuizIdClassIdStudentUid(quizName, className, studentName);
        await QuizRepository.removeStudentScore(quizId, classId, studentUid);
    }
}
module.exports = QuizService;