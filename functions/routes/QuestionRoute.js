const express = require("express");

class QuestionRoute {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }
    registerRoutes() {

    }
    getRouter() {
        return this.router;
    }
}
module.exports = new QuestionRoute().getRouter();