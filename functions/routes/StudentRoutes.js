const express = require("express");
const StudentController = require("../controllers/StudentController");
const Validator = require("../middlewares/Validator");

class StudentRoutes {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }
    registerRoutes(){
        this.router.post("/add_achievements", Validator.validateAddStudentAchievements, StudentController.addStudentAchievements);
        this.router.get("/get_achievements", StudentController.getStudentAchievements);
        this.router.get("/get_student_class", StudentController.getStudentClass);
        this.router.get("/get_student_information", StudentController.getStudentInformation);
    }
    getRouter() {
        return this.router;
    }
}

module.exports = new StudentRoutes().getRouter();