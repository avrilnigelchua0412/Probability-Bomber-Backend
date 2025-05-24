const express = require("express");
const StudentController = require("../controllers/StudentController");
const Validator = require("../middlewares/Validator");

class StudentRoutes {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }
    registerRoutes(){
        this.router.post("/add_achivements", Validator.validateAddStudentAchievements, StudentController.addStudentAchievements);
        this.router.get("/get_achivements", Validator.validateGetStudentAchievements, StudentController.getStudentAchievements);
    }  
    getRouter() {
        return this.router;
    }
}

module.exports = new StudentRoutes().getRouter();