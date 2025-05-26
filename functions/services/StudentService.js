const { array } = require("joi");
const StaticVariable = require("../config/StaticVariable");
const StudentRepository = require("../repositories/StudentRepository");
const QuizService = require("./QuizService");
const ClassRepository = require("../repositories/ClassRepository");
const UserRepository = require("../repositories/UserRepository");

class StudentService {
    static async addStudentAchievementsService(studentUid, achievement) {
        await StudentRepository.addAchievements(studentUid, achievement);
    }
    static async getStudentAchievementsService(studentUid) {
        return await StudentRepository.getStudentAchievements(studentUid);
    }
    static async getStudentClassNameService(studentUid) {
        return await StudentRepository.getStudentClassName(studentUid);
    }
    
    static async getStudentInformationService(studentUid) {
        const studentData = await UserRepository.getUserData(studentUid, StaticVariable.studentRole);
        const quizData = await QuizService.getAllTheQuizService();
        const data = await Promise.all(
            quizData.map( async quiz => {
                const studentInfo = quiz.studentInformation;
                if (studentInfo && typeof studentInfo === 'object') {
                    for (const [classId, studentMap] of Object.entries(studentInfo)) {
                        if (studentMap && typeof studentMap === 'object') {
                            for (const [studentId, studentInformation] of Object.entries(studentMap)) {
                                if (studentId === studentUid && studentInformation) {
                                    const classData = await ClassRepository.getClassData(classId);
                                    return {
                                        quizName: quiz.quizName,
                                        className: classData.className,
                                        studentName: studentData.name,
                                        studentInformation: studentInformation
                                    };
                                }
                            }
                        }
                    }
                }
            })
        );
        const filteredData = data.filter(entry => entry !== undefined);
        console.log("Student Information Data:", filteredData);
        return filteredData;
    }
}

module.exports = StudentService;