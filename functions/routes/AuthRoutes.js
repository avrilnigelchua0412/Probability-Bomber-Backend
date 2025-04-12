const express = require("express");
const AuthController = require("../controllers/AuthController");
const Validator = require("../middlewares/Validator")

class AuthRoutes {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post("/register", Validator.validateUser, AuthController.register);
        this.router.post("/login", AuthController.login);
        this.router.post("/forget_password", AuthController.forgetPassword);
        this.router.post("/reset_password", AuthController.resetPassword);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new AuthRoutes().getRouter();