const FirebaseService = require("../config/FirebaseService");
const StaticVariable = require("../config/StaticVariable");
const StudentModel = require("../models/User/StudentModel");

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
}

module.exports = StudentRepository;