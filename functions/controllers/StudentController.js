const StudentService = require("../services/StudentService");

class StudentController {
    static async addStudentAchievements(req, res) {
        try {
            const { studentName, achievement } = req.validatedBody;
            await StudentService.addStudentAchievementsService( studentName, achievement );
            res.status(200).json({ message: "Achievement added." });
        } catch (error) {
            console.error("Error adding achievement:", error);
            res.status(500).json({ error: "Failed to add achievement." });
        }
    }
    static async getStudentAchievements(req, res) {
        try {
            const { studentName } = req.validatedBody;
            const achievements = await StudentService.getStudentAchievementsService( studentName );
            res.status(200).json({ achievements });
        } catch (error) {
            console.error("Error getting achievements:", error);
            res.status(500).json({ error: "Failed to get achievements." });
        }
    }
}

module.exports = StudentController;