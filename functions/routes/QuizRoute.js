const express = require("express");
const QuizController = require("../controllers/QuizController");
const Validator = require("../middlewares/Validator")

class QuizRoute {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get("/get_all_quiz", QuizController.getAllTheQuiz)

        this.router.post("/create_quiz", Validator.validateCreateQuiz, QuizController.createQuizForTheTeacher)
        
        this.router.post("/add_class_quiz", QuizController.addClassInTheQuiz)
        this.router.post("/delete_class_quiz", QuizController.deleteClassInTheQuiz)

        this.router.post("/update_score", Validator.validateStudentInformation, QuizController.updateInformationOfTheStudent)
        this.router.post("/remove_score", Validator.validateStudentInformation, QuizController.removeInformationOfTheStudent)
    }
    getRouter() {
        return this.router;
    }
}
module.exports = new QuizRoute().getRouter();