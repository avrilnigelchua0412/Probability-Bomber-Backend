const QuestionRepository = require("../repositories/QuestionRepository");
const QuestionService = require("../services/QuestionService");


class QuestionController {
    static async createQuestionForTheQuiz(req, res){
        try {
            const { questionName, questionDescription, numerator, denominator } = req.body
            await QuestionRepository.createQuestion(questionName, questionDescription, numerator, denominator);
            res.status(200).json({ message: "Success!"});
        } catch (error) {
            console.error("Error creating question:", error);
            res.status(500).json({ error: "Failed to create question."});
        }
    }
    static async editQuestionOfTheQuiz(req, res){
        try {
            const { questionName, questionDescription, numerator, denominator } = req.body
            await QuestionRepository.editQuestion(questionName, questionDescription, numerator, denominator);
            res.status(200).json({ message: "Success!"});
        } catch (error) {
            console.error("Error editing question:", error);
            res.status(500).json({ error: "Failed to edit question."});
        }
    }
    static async removeQuestionOfTheQuiz(req, res){
        try {
            const { questionName } = req.body;
            await QuestionRepository.removeQuestion(questionName);
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