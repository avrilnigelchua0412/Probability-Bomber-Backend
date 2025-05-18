const express = require("express");
const QuestionController = require("../controllers/QuestionController");
const Validator = require("../middlewares/Validator")

class QuestionRoute {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get("/get_all_question", QuestionController.getAllQuestions)

        this.router.post("/create_question", Validator.validateCreateQuestion, QuestionController.createQuestionForTheQuiz)
        this.router.post("/edit_question", Validator.validateEditQuestion, QuestionController.editQuestionOfTheQuiz)

        this.router.post("/remove_all_question", QuestionController.removeAllQuestionOfTheQuiz)
        this.router.post("/remove_a_question", QuestionController.removeAQuestionOfAQuiz)
        this.router.post("/delete_question", QuestionController.DeleteQuestion)
        
        this.router.post("/add_question_to_quiz", QuestionController.addQuestionToTheQuiz)
    }
    getRouter() {
        return this.router;
    }
}
module.exports = new QuestionRoute().getRouter();