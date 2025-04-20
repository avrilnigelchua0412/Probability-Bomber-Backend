const express = require("express");
const TeacherController = require("../controllers/TeacherController");

class TeacherRoutes {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }
    registerRoutes(){
        this.router.post("/create_class", TeacherController.createClassForTheTeacher);
        this.router.post("/remove_class", TeacherController.removeClassOfTheTeacher);
        this.router.post("/add_student", TeacherController.addStudentToClass);
        this.router.post("/remove_student", TeacherController.removeStudentFromClass);
        this.router.get("/teacher_classes", TeacherController.getTeacherClassNames);
        this.router.post("/class_students", TeacherController.getAllStudentsNameInClass);
    }    
    getRouter() {
        return this.router;
    }
}

module.exports = new TeacherRoutes().getRouter();