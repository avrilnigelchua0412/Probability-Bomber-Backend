const HelperRepository = require("../repositories/HelperRepository");
const QuizRepository = require("../repositories/QuizRepository");
const QuizService = require("../services/QuizService");

/**
 * Implement: (Based on the Model Object's Fields)
 * Create Quiz
 * QuizName Edit
 * Add, Remove and Edit(?) Class ID should affect `classIds` and `studentScores`
 * Add and Remove Question
 * Add and Remove Students in `studentScores`
 * Add, Edit and Remove Scores in `studentScores`
 */

class QuizController {
    static async createQuizForTheTeacher(req, res){
        try {
            const { quizName } = req.body;
            await QuizService.createQuizService(quizName, req.uid);
            res.status(200).json({ message: "Success!"});
        } catch (error) {
            console.error("Error creating quiz:", error);
            res.status(500).json({ error: "Failed to create quiz."});
        }
    }

    static async deleteClassInTheQuiz(req, res) {
        try {
            const { quizName, className } = req.body;
            await QuizService.deleteClassOnQuizService(quizName, className);
            res.status(200).json({ message: "Class successfully removed from quiz." });
        } catch (error) {
            console.error("Error deleting class from quiz:", error);
            res.status(500).json({ error: "Failed to delete class from quiz." });
        }
    }

    static async addClassInTheQuiz(req, res) {
        try {
            const { quizName, className } = req.body;
            await QuizService.addClassOnQuizService(quizName, className)
            res.status(200).json({ message: "Class successfully added to quiz." });
        } catch (error) {
            console.error("Error adding class to quiz:", error);
            res.status(500).json({ error: "Failed to add class to quiz." });
        }
    }


    static async updateScoreOfTheStudent(req, res){
        try {
            const { quizName, className, studentName, score } = req.body;
            await QuizService.updateStudentScoreService(quizName, className, studentName, score);
            res.status(200).json({ message: 'Score updated successfully' });
        } catch (error) {
            console.error('Error updating score:', error);
            res.status(500).json({ error: 'Failed to update score'});
        }
    }
    static async removeScoreOfTheStudent(req, res){
        try {
            const { quizName, className, studentName } = req.body;
            await QuizService.removeStudentScoreService(quizName, className, studentName);
            res.status(200).json({ message: 'Student score removed successfully' });
        } catch (error) {
            console.error("Error removing student score:", error);
            res.status(500).json({ error: "Failed to remove student score."});
        }
    }
}

module.exports = QuizController;