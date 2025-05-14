const express = require("express");
const QuestionController = require("../controllers/QuestionController");

class QuestionRoute {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.post("/create_question", QuestionController.createQuestionForTheQuiz)
        this.router.post("/edit_question", QuestionController.editQuestionOfTheQuiz)
        this.router.post("/remove_question", QuestionController.removeQuestionOfTheQuiz)
        this.router.post("/add_question_to_quiz", QuestionController.addQuestionToTheQuiz)
    }
    getRouter() {
        return this.router;
    }
}
module.exports = new QuestionRoute().getRouter();