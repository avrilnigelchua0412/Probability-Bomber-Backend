// const jwt = require("jsonwebtoken");
// const { secretKey } = require("../config");

const admin = require("firebase-admin");

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log("Authentication Header: ", authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.uid = decodedToken.uid; // Attach the Firebase UID to the request
        req.token = token;
        next(); // Proceed to the next middleware/route
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = authenticate;