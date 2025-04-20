const FirebaseService = require("../config/FirebaseService");
const TeacherModel = require("../models/User/TeacherModel");
const UserRepository = require("../repositories/UserRepository");
const StaticVariable = require("../config/StaticVariable");
const ClassRepository = require("./ClassRepository");

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
}

module.exports = TeacherRepository;