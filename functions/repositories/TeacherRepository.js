const UserRepository = require("../repositories/UserRepository");
const StaticVariable = require("../config/StaticVariable");
const ClassRepository = require("./ClassRepository");
const StudentRepository = require("./StudentRepository");
const FirebaseService = require("../config/FirebaseService");

class TeacherRepository{
    static async repositoryHelper(teacherId){
        const teacherData = await UserRepository.getUserData(teacherId, StaticVariable.teacherRole);
        const teacherRef = await UserRepository.getUserDocument(teacherId, StaticVariable.teacherRole);
        const existingClassIds = Array.isArray(teacherData.classes) ? teacherData.classes : [];
        return { teacherRef, existingClassIds }
    }
    static async addClass(classId, teacherId){
        const { teacherRef, existingClassIds } = await TeacherRepository.repositoryHelper(teacherId);
        if (!existingClassIds.includes(classId)) {
            existingClassIds.push(classId);
            await teacherRef.update({ classes: existingClassIds })
            .then(() => console.log("Class Added! Successfully updated classes"))
            .catch(err => console.error("Failed to update classes:", err));
        }
    }
    static async removeClass(teacherId, className) {
        try {
            const { teacherRef, existingClassIds } = await TeacherRepository.repositoryHelper(teacherId);
            const classId = await ClassRepository.getClassIdByName(className);
    
            if (existingClassIds.includes(classId)) {
                const updatedClassIds = existingClassIds.filter(id => id !== classId);
    
                await teacherRef.update({ classes: updatedClassIds });
                console.log("Class Removed! Successfully updated classes");
            }
    
            return classId;
        } catch (error) {
            console.error("Failed to remove class from teacher:", error);
            throw error; // Propagate to controller
        }
    }
    static async addStudentToTheClass(studentUid, classData, classRef, classId){
        const studentUids = classData.studentUids || [];
        const studentClassChecker = await StudentRepository.studentClassExistChecker(studentUid);
        if(studentClassChecker == true){
            throw new Error(`Student already have a Class!`);
        } 
        if (!studentUids.includes(studentUid)) {
            await StudentRepository.addClass(studentUid, classId)
            studentUids.push(studentUid);
            await classRef.update({ studentUids });
        }
    }
    static async removeStudentToTheClass(studentUid, classData, classRef){
        const studentClassChecker = await StudentRepository.studentClassExistChecker(studentUid);
        if(studentClassChecker == false){
            throw new Error(`Student does not have Class!`);
        } 
        const updatedUids = (classData.studentUids || []).filter(uid => uid !== studentUid);
        await StudentRepository.removeClass(studentUid);
        await classRef.update({ studentUids: updatedUids });
    }
    static async removeTeacherClass(classId, classData){
        const studentUids = classData.studentUids || [];
        await Promise.all(
            studentUids.map(async (studentUid) =>
                await StudentRepository.removeClass(studentUid)
            )
        );
        await ClassRepository.removeClassFromDocuments(classId);
    }
    static async getTeacherSnapshot(teacherUid) {
        return await FirebaseService.getDB()
            .collection(StaticVariable.collectionTeacher)
            .doc(teacherUid)
            .get();
    }
}

module.exports = TeacherRepository;