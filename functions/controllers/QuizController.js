const QuizRepository = require("../repositories/QuizRepository");

class QuizController {
    static async createQuizForTheTeacher(req, res){
        try {
            const { quizName, className } = req.body;
            await QuizRepository.createQuiz(quizName, className, req.uid);
             res.status(200).json({ message: "Success!"});
        } catch (error) {
            console.error("Error creating quiz:", error);
            res.status(500).json({ error: "Failed to create quiz."});
        }
    }
    static async editQuizForTheTeacher(req, res){
        try {
            const {}
        } catch (error) {
            console.error("Error editing quiz:", error);
            res.status(500).json({ error: "Failed to edit quiz."});
        }
    }
    static async removeQuizForTheTeacher(req, res){
        try {
            
        } catch (error) {
            
        }
    }
    static async getAllQuizName(req, res){
        try {
            
        } catch (error) {
            
        }
    }
}

module.exports = QuizController;