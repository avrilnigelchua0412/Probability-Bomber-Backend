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
        this.router.post("/get_specific_stage_information", StageController.getSpecificStageInformation)
        this.router.get("/get_global_stage_information", StageController.getGlobalStageInformation)
        this.router.get("/get_a_user_stage_information", StageController.getAUserStageInformation)

    }
    getRouter() {
        return this.router;
    }
}
module.exports = new StageRoute().getRouter();