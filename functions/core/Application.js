const express = require("express");
const cors = require("cors");
const StaticVariable = require('../config/StaticVariable');
const Authenticator = require("../middlewares/authMiddleware");
const userRoutes = require("../routes/UserRoutes");
const authRoutes = require("../routes/AuthRoutes"); 
const teacherRoutes = require("../routes/TeacherRoutes");
const quizRoutes = require("../routes/QuizRoute");
const questionRoutes = require("../routes/QuestionRoute");
const studentRoutes = require("../routes/StudentRoutes");
const stageRoutes = require("../routes/StageRoute");
const achievementRoutes = require("../routes/AchievementRoute");
const emailRoutes = require("../routes/EmailRoute");
const ErrorHandler = require("../middlewares/ErrorHandler");

class Application{
    constructor(){
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandler();
    }
    setupMiddleware() {
        this.app.use(express.json());

        /*this.app.use(cors({
            origin: StaticVariable.corsOrigin,
            methods: StaticVariable.corsMethod,
            allowedHeaders: StaticVariable.corsHeader,
            credentials: true
        }));

        this.app.options("/*", cors({
            origin: StaticVariable.corsOrigin,
            methods: StaticVariable.corsMethod,
            allowedHeaders: StaticVariable.corsHeader,
            credentials: true
        }));*/

        this.app.use((req, res, next) => {
            console.log("Path: ", req.path)
            if (StaticVariable.publicPaths.includes(req.path)){
                return next();
            }
            Authenticator.authenticate(req, res, next);
        });
    }
    setupRoutes() {
        this.app.use(StaticVariable.authPath, authRoutes);
        this.app.use(StaticVariable.userPath, userRoutes);
        this.app.use(StaticVariable.teacherPath, teacherRoutes);
        this.app.use(StaticVariable.quizPath, quizRoutes);
        this.app.use(StaticVariable.questionPath, questionRoutes);
        this.app.use(StaticVariable.studentPath, studentRoutes);
        this.app.use(StaticVariable.stagePath, stageRoutes);
        this.app.use(StaticVariable.achievementPath, achievementRoutes);
        this.app.use("/api/email", emailRoutes);
    }

    setupErrorHandler() {
        this.app.use(ErrorHandler.errorHandler)
    } 
    
    getInstance() {
        return this.app;
    }
}
module.exports = Application;