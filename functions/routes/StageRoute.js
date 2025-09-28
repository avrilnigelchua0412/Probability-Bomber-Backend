const express = require("express");
const StageController = require("../controllers/StageController");
const Validator = require("../middlewares/Validator");

class StageRoute {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.post("/add_stage_information", Validator.validateAddStageInformation, StageController.addStageInformation)
    }
    getRouter() {
        return this.router;
    }
}
module.exports = new StageRoute().getRouter();