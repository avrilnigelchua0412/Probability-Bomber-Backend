const StudentService = require("../services/StudentService");

class StudentController {
    static async addStudentAchievements(req, res) {
        try {
            const { achievement } = req.validatedBody;
            await StudentService.addStudentAchievementsService( req.uid, achievement );
            res.status(200).json({ message: "Achievement added." });
        } catch (error) {
            console.error("Error adding achievement:", error);
            res.status(500).json({ error: "Failed to add achievement." });
        }
    }
    static async getStudentAchievements(req, res) {
        try {
            const achievements = await StudentService.getStudentAchievementsService( req.uid );
            res.status(200).json({ achievements });
        } catch (error) {
            console.error("Error getting achievements:", error);
            res.status(500).json({ error: "Failed to get achievements." });
        }
    }
    static async getStudentClass(req, res) {
        try {
            const className = await StudentService.getStudentClassNameService( req.uid );
            res.status(200).json({ className });
        } catch (error) {
            console.error("Error getting class name:", error);
            res.status(500).json({ error: "Failed to get class name." });
        }
    }
    static async getStudentInformation(req, res) {
        try {
            const studentInformation = await StudentService.getStudentInformationService( req.uid );
            res.status(200).json({ studentInformation });
        } catch (error) {
            console.error("Error getting class name:", error);
            res.status(500).json({ error: "Failed to get class name." });
        }
    }
}

module.exports = StudentController;