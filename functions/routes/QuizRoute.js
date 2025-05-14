const express = require("express");
const QuizController = require("../controllers/QuizController");

class QuizRoute {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.post("/create_quiz", QuizController.createQuizForTheTeacher)
        
        this.router.post("/add_class_quiz", QuizController.addClassInTheQuiz)
        this.router.post("/delete_class_quiz", QuizController.deleteClassInTheQuiz)
        this.router.post("/delete_question_quiz", QuizController.deleteQuestionInTheQuiz)
        this.router.post("/add_question_quiz", QuizController.addQuestionInTheQuiz)


        this.router.post("/update_score", QuizController.updateScoreOfTheStudent)
        this.router.post("/add_class_entry", QuizController.addClassEntryforTheStudents)
        this.router.post("/remove_score", QuizController.removeScoreOfTheStudent)
        // this.router.post("/remove_class_entry", QuizController.removeClassOfTheStudents)
    }
    getRouter() {
        return this.router;
    }
}
module.exports = new QuizRoute().getRouter();