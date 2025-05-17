const ClassRepository = require("../repositories/ClassRepository");
const HelperRepository = require("../repositories/HelperRepository");
const TeacherRepository = require("../repositories/TeacherRepository");

class TeacherService {
    static async createClassForTheTeacherService(className, teacherUid){
        const classId = await ClassRepository.createClass(className, teacherUid)
        await TeacherRepository.addClass(classId, teacherUid)
    }
    static async addStudentToClassService(className, studentName){
        const { studentUid, classData, classRef, classId } = await HelperRepository.studentUidAndClassData(className, studentName);
        await TeacherRepository.addStudentToTheClass(studentUid, classData, classRef, classId);
    }
    static async removeStudentFromClassService(className, studentName){
        const { studentUid, classData, classRef, classId } = await HelperRepository.studentUidAndClassData(className, studentName);
        await TeacherRepository.removeStudentToTheClass(studentUid, classData, classRef);
    }
    static async removeClassOfTheTeacherService(className, teacherUid){
        if (!className) throw new Error("Class name is required.");
        const classId = await TeacherRepository.removeClass(teacherUid, className);
        const classData = await ClassRepository.getClassData(classId);
        await TeacherRepository.removeTeacherClass(classId, classData);
    }
    static async editClassOfTheTeacherService(className, teacherUid, newClassName){
        if (!className) throw new Error("Class name is required.");
        const classNameQuery = await ClassRepository.getClassDataByNameHelper(className);
        if(classNameQuery.empty) throw new Error("No Class Name found.");

        const classData = classNameQuery.docs[0].data();
        const teacherClasses = await HelperRepository.getAllTeacherClassDataPromise(teacherUid);

        const isClassOwnedByTeacher = teacherClasses.some(doc => doc.className === classData.className);
        if (!isClassOwnedByTeacher) throw new Error("No Class Name found for this teacher.");

        const classId = classNameQuery.docs[0].id;
        await ClassRepository.editClassName(classId, newClassName)
    }
    static async getTeacherClassNamesService(teacherUid){
        const classDocs = await HelperRepository.getAllTeacherClassDataPromise(teacherUid);
        return classDocs.map(doc => doc.className);
    }
}
module.exports = TeacherService;