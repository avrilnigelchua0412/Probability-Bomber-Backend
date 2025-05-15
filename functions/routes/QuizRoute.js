const express = require("express");
const QuizController = require("../controllers/QuizController");

class QuizRoute {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get("/get_all_quiz", QuizController.getAllTheQuiz)

        this.router.post("/create_quiz", QuizController.createQuizForTheTeacher)
        
        this.router.post("/add_class_quiz", QuizController.addClassInTheQuiz)
        this.router.post("/delete_class_quiz", QuizController.deleteClassInTheQuiz)

        this.router.post("/update_score", QuizController.updateScoreOfTheStudent)
        this.router.post("/remove_score", QuizController.removeScoreOfTheStudent)
    }
    getRouter() {
        return this.router;
    }
}
module.exports = new QuizRoute().getRouter();