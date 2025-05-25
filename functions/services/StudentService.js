const StaticVariable = require("../config/StaticVariable");
const StudentRepository = require("../repositories/StudentRepository");

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
}
module.exports = StudentService;