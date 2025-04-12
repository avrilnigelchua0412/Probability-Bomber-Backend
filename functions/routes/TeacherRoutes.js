const express = require("express");
const TeacherController = require("../controllers/TeacherController");

class TeacherRoutes {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }
    registerRoutes(){
        this.router.post("/create_class", TeacherController.createClass);
        this.router.post("/add_student", TeacherController.addStudentToClass);
        this.router.post("/remove_student", TeacherController.removeStudentFromClass);
    }    
    getRouter() {
        return this.router;
    }
}

module.exports = new TeacherRoutes().getRouter();