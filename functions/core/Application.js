const express = require("express");
const cors = require("cors");
const StaticVariable = require('../config/StaticVariable');
const Authenticator = require("../middlewares/AuthMiddleware");
const userRoutes = require("../routes/UserRoutes");
const authRoutes = require("../routes/AuthRoutes"); 

class Application{
    constructor(){
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
        this.setupDefaultRoute();
    }
    setupMiddleware() {
        this.app.use(express.json());

        this.app.use(cors({
            origin: StaticVariable.corsOrigin,
            methods: StaticVariable.corsMethod,
            allowedHeaders: StaticVariable.corsHeader
        }));

        this.app.use((req, res, next) => {
            if (StaticVariable.publicPaths.includes(req.path))
                return next();
            Authenticator.authenticate(req, res, next);
        });
    }
    setupRoutes() {
        this.app.use(StaticVariable.authPath, authRoutes);
        this.app.use(StaticVariable.userPath, userRoutes);
    }

    setupDefaultRoute() {
        this.app.get(StaticVariable.pathDefault, (req, res) => {
            res.status(200).send({ message: "Hello World" });
        });
    } 
    
    getInstance() {
        return this.app;
    }
}
module.exports = Application;