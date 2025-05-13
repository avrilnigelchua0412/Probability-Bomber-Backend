const ClassRepository = require("../repositories/ClassRepository");
const HelperRepository = require("../repositories/HelperRepository");
const StudentRepository = require("../repositories/StudentRepository");
const TeacherRepository = require("../repositories/TeacherRepository");
class TeacherController {
    static async createClassForTheTeacher(req, res){
        try {
            const { className } = req.body;
            console.log("Teacher ID: ", req.uid)
            const classId = await ClassRepository.createClass(className, req.uid)
            await TeacherRepository.addClass(classId, req.uid)
            res.status(200).json({ message: "Success!"});
        } catch (error) {
            console.error("Error creating class:", error);
            res.status(500).json({ error: "Failed to create class."});
        }
    }

    static async addStudentToClass(req, res) {
        try {
            const { className, studentName } = req.body;
            const { studentUid, classData, classRef, classId } = await HelperRepository.studentUidAndClassData(className, studentName);
    
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

            res.status(200).json({ message: "Student added to class." });
        } catch (error) {
            console.error("Error adding student:", error);
            res.status(500).json({ error: "Failed to add student." });
        }
    }

    static async removeStudentFromClass(req, res) {
        try {
            const { className, studentName } = req.body;
            const { studentUid, classData, classRef, classId } = await HelperRepository.studentUidAndClassData(className, studentName);
    
            const studentClassChecker = await StudentRepository.studentClassExistChecker(studentUid);

            if(studentClassChecker == false){
                throw new Error(`Student does not have Class!`);
            } 

            const updatedUids = (classData.studentUids || []).filter(uid => uid !== studentUid);
            
            await StudentRepository.removeClass(studentUid);
            await classRef.update({ studentUids: updatedUids });

            res.status(200).json({ message: "Student removed from class." });
        } catch (error) {
            console.error("Error removing student:", error);
            res.status(500).json({ error: "Failed to remove student." });
        }
    }

    static async removeClassOfTheTeacher(req, res){
        try {
            const { className } = req.body;
            if (!className) throw new Error("Class name is required.");
    
            const classId = await TeacherRepository.removeClass(req.uid, className);
            const classData = await ClassRepository.getClassData(classId);
            const studentUids = classData.studentUids || [];
    
            await Promise.all(
                studentUids.map(async (studentUid) =>
                    await StudentRepository.removeClass(studentUid)
                )
            );
    
            await ClassRepository.removeClassFromDocuments(classId);
    
            res.status(200).json({ message: "Success!" });
        } catch (error) {
            console.error("Error removing class:", error);
            res.status(500).json({ error: "Failed to remove class." });
        }
    }

    static async getTeacherClassNames(req, res){
        try {
            const classDocs = await HelperRepository.getAllTeacherClassDataPromise(req.uid);
            const classNames = classDocs.map(doc => doc.className);
            res.status(200).json({ classes: classNames });
        } catch (error) {
            res.status(500).json({ error: "Class Name: ", error });
        }
    }

    static async getAllStudentsNameInClass(req, res){
        try {
            const { className } = req.body;
            const studentsName = await HelperRepository.getAllStudentsNameInClassByClassName(className);
            res.status(200).json({studentsName:studentsName});
        } catch (error) {
            res.status(500).json({ error: "Students in Class: ", error });
        }
    }
}

module.exports = TeacherController;