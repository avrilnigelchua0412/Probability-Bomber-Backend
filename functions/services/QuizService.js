const StaticVariable = require("../config/StaticVariable");
const CreateQuizDTO = require("../dto/CreateQuizDTO");
const StudentInformationDTO = require("../dto/StudentInformationDTO");
const ClassRepository = require("../repositories/ClassRepository");
const HelperRepository = require("../repositories/HelperRepository");
const QuizRepository = require("../repositories/QuizRepository");
const UserRepository = require("../repositories/UserRepository");

class QuizService {
    static async createQuizService(createQuizDTO, teacherUid){
        if(createQuizDTO instanceof CreateQuizDTO){
            const quizNameQuery = await QuizRepository.getQuizDataByNameHelper(createQuizDTO.quizName);
            if (!quizNameQuery.empty) {
                throw new Error("Quiz Name already exists.");
            }
            const teacherData = await UserRepository.getUserData(teacherUid, StaticVariable.teacherRole);
            const teacherName = teacherData.name
            return await QuizRepository.createQuiz(createQuizDTO, teacherName);
        }
        throw new Error(`Invalid DTO instance received in createQuizService`);
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

    static async updateStudentInformationService(studentInformationDTO){
        if (studentInformationDTO instanceof StudentInformationDTO){
            const { quizName, className, studentName } = studentInformationDTO.getInformationNames();
            const {quizId, classId, studentUid } = await HelperRepository.getQuizIdClassIdStudentUid(quizName, className, studentName);
            await QuizRepository.updateStudentInformation(quizId, classId, studentUid, studentInformationDTO.studentInformation);
        } else {
            throw new Error(`Invalid DTO instance received in updateStudentInformationService`);
        }
    }
    static async removeStudentInformationService(studentInformationDTO){
        if (studentInformationDTO instanceof StudentInformationDTO){
            const { quizName, className, studentName } = studentInformationDTO.getInformationNames();
            const {quizId, classId, studentUid } = await HelperRepository.getQuizIdClassIdStudentUid(quizName, className, studentName);
            await QuizRepository.removeStudentInformation(quizId, classId, studentUid);
        } else {
            throw new Error(`Invalid DTO instance received in removeStudentInformationService`);
        }
    }
    static async getAllTheQuizService(){
        const snapshot = await QuizRepository.getQuizSnapshot();
        return await Promise.all(
            snapshot.docs.map(async (doc) => doc.data())
        );
    }
}
module.exports = QuizService;