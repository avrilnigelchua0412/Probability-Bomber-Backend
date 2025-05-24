const StudentRepository = require("../repositories/StudentRepository");

class StudentService {
    static async addStudentAchievementsService(studentName, achievement) {
        const studentUid = await StudentRepository.findStudentUidByEmailOrUsername(studentName);
        await StudentRepository.addAchievements(studentUid, achievement);
    }
    static async getStudentAchievementsService(studentName) {
        const studentUid = await StudentRepository.findStudentUidByEmailOrUsername(studentName);
        return await StudentRepository.getStudentAchievements(studentUid);
    }
}
module.exports = StudentService;