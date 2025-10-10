const express = require("express");
const AchievementController = require("../controllers/AchievementController");

class AchievementRoute {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.post("/add_user_achievement", AchievementController.addUserAchievement)
        this.router.get("/get_user_achievement", AchievementController.getUserAchievement);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new AchievementRoute().getRouter();