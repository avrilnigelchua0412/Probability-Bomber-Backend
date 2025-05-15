const HelperRepository = require("../repositories/HelperRepository");
const TeacherService = require("../services/TeacherService");
class TeacherController {
    static async createClassForTheTeacher(req, res){
        try {
            const { className } = req.body;
            await TeacherService.createClassForTheTeacherService(className, req.uid);
            res.status(200).json({ message: "Success!"});
        } catch (error) {
            console.error("Error creating class:", error);
            res.status(500).json({ error: "Failed to create class."});
        }
    }

    static async addStudentToClass(req, res) {
        try {
            const { className, studentName } = req.body;
            await TeacherService.addStudentToClassService(className, studentName);
            res.status(200).json({ message: "Student added to class." });
        } catch (error) {
            console.error("Error adding student:", error);
            res.status(500).json({ error: "Failed to add student." });
        }
    }

    static async removeStudentFromClass(req, res) {
        try {
            const { className, studentName } = req.body;
            await TeacherService.removeStudentFromClassService(className, studentName)
            res.status(200).json({ message: "Student removed from class." });
        } catch (error) {
            console.error("Error removing student:", error);
            res.status(500).json({ error: "Failed to remove student." });
        }
    }

    static async removeClassOfTheTeacher(req, res){
        try {
            const { className } = req.body;
            await TeacherService.removeClassOfTheTeacherService(className, req.uid)
            res.status(200).json({ message: "Success!" });
        } catch (error) {
            console.error("Error removing class:", error);
            res.status(500).json({ error: "Failed to remove class." });
        }
    }

    static async getTeacherClassNames(req, res){
        try {
            const classNames = await TeacherService.getTeacherClassNamesService(req.uid);
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
            res.status(500).json({ message: "Failed to fetch students in class.", details: error.message });
        }
    }
}

module.exports = TeacherController;