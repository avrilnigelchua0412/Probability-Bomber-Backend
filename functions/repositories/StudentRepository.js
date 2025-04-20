const FirebaseService = require("../config/FirebaseService");
const StaticVariable = require("../config/StaticVariable");
const UserRepository = require("./UserRepository");
const admin = require("firebase-admin");

class StudentRepository {
    static async findStudentUidByEmailOrUsername(emailOrName) {
        const db = FirebaseService.getDB();
        const emailQuery = await db
            .collection(StaticVariable.studentRole)
            .where("email", "==", emailOrName)
            .limit(1)
            .get();
        if (!emailQuery.empty) return emailQuery.docs[0].id;
        const nameQuery = await db
            .collection(StaticVariable.studentRole)
            .where("name", "==", emailOrName)
            .limit(1)
            .get();
        if (!nameQuery.empty) return nameQuery.docs[0].id;
        throw new Error("No student found with that email or name.");
    }

    static async removeClass(studentUid) {
        try {
            const studentRef = await UserRepository.getUserDocument(studentUid, StaticVariable.studentRole);
            await studentRef.update({ classId: null });
        } catch (error) {
            console.error(`Failed to remove class from student ${studentUid}:`, error);
            throw error;
        }
    }
    
    static async addClass(studentUid, classId) {
        const studentRef = await UserRepository.getUserDocument(studentUid, StaticVariable.studentRole);
        await studentRef.update({ classId: classId });
    }

    static async studentClassExistChecker(studentUid){
        const studentData = await UserRepository.getUserData(studentUid, StaticVariable.studentRole);
        return studentData.classId == null ? false : true
    }
}
module.exports = StudentRepository;