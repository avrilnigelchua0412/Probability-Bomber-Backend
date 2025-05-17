const QuestionRepository = require("../repositories/QuestionRepository");
const QuestionService = require("../services/QuestionService");


class QuestionController {
    static async getAllQuestions(req, res){
        try {
            const allQuestions = await QuestionService.getAllQuestionService()
            res.status(200).json({ allQuestions });
        } catch (error) {
            console.error("Error getting all question:", error);
            res.status(500).json({ error: "Failed to get all question."});
        }
    }
    static async createQuestionForTheQuiz(req, res){
        try {
            const { questionName, questionDescription, numerator, denominator, probability, event } = req.body
            if (!Array.isArray(event)) {
                return res.status(400).json({ error: "'event' must be an array." });
            }
            await QuestionRepository.createQuestion(questionName, questionDescription, numerator, denominator, probability, event);
            res.status(200).json({ message: "Success!"});
        } catch (error) {
            console.error("Error creating question:", error);
            res.status(500).json({ error: "Failed to create question."});
        }
    }
    static async editQuestionOfTheQuiz(req, res){
        try {
            const { questionName, questionDescription, numerator, denominator, probability, event, originalQuestionName } = req.body
            if (!Array.isArray(event)) {
                return res.status(400).json({ error: "'event' must be an array." });
            }
            await QuestionRepository.editQuestion(questionName, questionDescription, numerator, denominator, probability, event, originalQuestionName);
            res.status(200).json({ message: "Success!"});
        } catch (error) {
            console.error("Error editing question:", error);
            res.status(500).json({ error: "Failed to edit question."});
        }
    }
    static async removeAllQuestionOfTheQuiz(req, res){
        try {
            const { questionName } = req.body;
            await QuestionService.removeAllQuestionService(questionName);
            res.status(200).json({ message: "Success!"});
        } catch (error) {
            console.error("Error removing question:", error);
            res.status(500).json({ error: "Failed to remove question."});
        }
    }
    static async removeAQuestionOfAQuiz(req, res){
        try {
            const { questionName, quizName } = req.body;
            await QuestionService.removeAQuestionOfAQuiz(questionName, quizName);
            res.status(200).json({ message: "Success!"});
        } catch (error) {
            console.error("Error removing question:", error);
            res.status(500).json({ error: "Failed to remove question."});
        }
    }
    static async DeleteQuestion(req, res){
        try {
            const { questionName } = req.body;
            await QuestionService.deleteQuestionService(questionName);
            res.status(200).json({ message: "Success!"});
        } catch (error) {
            console.error("Error removing question:", error);
            res.status(500).json({ error: "Failed to remove question."});
        }
    }
    static async addQuestionToTheQuiz(req, res){
        try {
            const { questionName, quizName } = req.body;
            await QuestionService.addQuestionToTheQuizService(questionName, quizName);
            res.status(200).json({ message: "Success!"});
        } catch (error) {
            console.error("Error adding question to quiz:", error);
            res.status(500).json({ error: "Failed to add question to quiz."});
        }
    }
}
module.exports = QuestionController;