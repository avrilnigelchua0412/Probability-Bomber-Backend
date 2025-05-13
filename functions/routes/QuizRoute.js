const express = require("express");
const QuizController = require("../controllers/QuizController");

class QuizRoute {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.post("/create_quiz", QuizController.createQuizForTheTeacher)
        this.router.post("/edit_quiz", QuizController.editQuizForTheTeacher)
        // this.router.post("/remove_quiz", QuizController.removeQuizForTheTeacher)
        // this.router.get("/get_all_quiz", QuizController.getAllQuizName)
    }
    getRouter() {
        return this.router;
    }
}
module.exports = new QuizRoute().getRouter();