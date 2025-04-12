const { onRequest } = require("firebase-functions/v2/https");
const Application = require("./core/Application");

const appInstance = new Application().getInstance();
exports.app = onRequest(appInstance);