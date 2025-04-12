const express = require("express");
const UserController = require("../controllers/UserController");

class UserRoutes {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get("/user-profile", UserController.getUserProfile);
    }
    getRouter() {
        return this.router;
    }
}
module.exports = new UserRoutes().getRouter();