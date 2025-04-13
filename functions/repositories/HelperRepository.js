const ClassRepository = require("../repositories/ClassRepository");
const StudentRepository = require("../repositories/StudentRepository");
class HelperRepository{
    static async studentUidAndClassData(classId, emailOrName) {
        const studentUid = await StudentRepository.findStudentUidByEmailOrUsername(emailOrName);
        const classData = await ClassRepository.getClassData(classId);
        const classRef = await ClassRepository.getClassDocument(classId); // Get doc ref
        return { studentUid, classData, classRef };
    }
}
module.exports = HelperRepository;