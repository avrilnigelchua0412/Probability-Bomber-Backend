const FirebaseService = require("../config/FirebaseService");
const TeacherModel = require("../models/User/TeacherModel");
const UserRepository = require("../repositories/UserRepository");
const StaticVariable = require("../config/StaticVariable");

class TeacherRepository{
    static async addClass(classId, teacherId){
        const teacherData = await UserRepository.getUserData(teacherId, StaticVariable.teacherRole);
        const teacherRef = await UserRepository.getUserDocument(teacherId, StaticVariable.teacherRole);
        console.log("Teacher Class: ", teacherData.classes);
        const existingClassIds = Array.isArray(teacherData.classes) ? teacherData.classes : [];
        
        console.log("Updating teacher:", teacherId, "with classId:", classId);

        if (!existingClassIds.includes(classId)) {
            existingClassIds.push(classId);
            await teacherRef.update({ classes: existingClassIds })
            .then(() => console.log("Successfully updated classes"))
            .catch(err => console.error("Failed to update classes:", err));

        }
    }
}

module.exports = TeacherRepository;