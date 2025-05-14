const ClassRepository = require("../repositories/ClassRepository");
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

    static async deleteQuestionInTheQuiz(req, res) {
        try {
            const { quizName, questionId } = req.body;
            // TODO:
            res.status(200).json({ message: "Question successfully removed from quiz." });
        } catch (error) {
            console.error("Error deleting question from quiz:", error);
            res.status(500).json({ error: "Failed to delete question from quiz." });
        }
    }

    static async addQuestionInTheQuiz(req, res) {
        try {
            const { quizName, questionId } = req.body;
            // TODO:
            res.status(200).json({ message: "Question successfully added to quiz." });
        } catch (error) {
            console.error("Error adding question to quiz:", error);
            res.status(500).json({ error: "Failed to add question to quiz." });
        }
    }


    static async updateScoreOfTheStudent(req, res){
        try {
            const { quizName, className, studentName, score } = req.body;
            const {quizId, classId, studentUid } = await HelperRepository.getQuizIdClassIdStudentUid(quizName, className, studentName);
            await QuizRepository.updateStudentScore(quizId, classId, studentUid, score)
            res.status(200).json({ message: 'Score updated successfully' });
        } catch (error) {
            console.error('Error updating score:', error);
            res.status(500).json({ error: 'Failed to update score'});
        }
    }
    static async addClassEntryforTheStudents(req, res){
        try {
            const { quizName, className } = req.body;
            // const quizId = await QuizRepository.getQuizIdByName(quizName);
            // const classId = await ClassRepository.getClassIdByName(className);
            // await QuizRepository.addClassEntry(quizId, classId)
            res.status(200).json({ message: 'Class entry added successfully' });
        } catch (error) {
            console.error("Error adding class:", error);
            res.status(500).json({ error: "Failed to add class."});
        }
    }
    static async removeScoreOfTheStudent(req, res){
        try {
            const { quizName, className, studentName } = req.body;
            const { quizId, classId, studentUid } = await HelperRepository.getQuizIdClassIdStudentUid(quizName, className, studentName);
            await QuizRepository.removeStudentScore(quizId, classId, studentUid);
            res.status(200).json({ message: 'Student score removed successfully' });
        } catch (error) {
            console.error("Error removing student score:", error);
            res.status(500).json({ error: "Failed to remove student score."});
        }
    }
    static async removeClassOfTheStudents(req, res){
        try {
            const { quizName, className } = req.body;
            // const quizId = await QuizRepository.getQuizIdByName(quizName);
            // const classId = await ClassRepository.getClassIdByName(className);
            // await QuizRepository.removeClassEntry(quizId, classId)
            res.status(200).json({ message: 'Class entry removed successfully' });
        } catch (error) {
            console.error("Error removing class entry:", error);
            res.status(500).json({ error: "Failed to remove class entry."});
        }
    }
}

module.exports = QuizController;