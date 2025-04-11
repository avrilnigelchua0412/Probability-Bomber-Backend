const admin = require("firebase-admin");

class Authenticator {
    /**
     * Middleware to authenticate Firebase ID token from Authorization header.
     */
    static authenticate(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ error: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        admin.auth().verifyIdToken(token)
            .then(decodedToken => {
                req.uid = decodedToken.uid; // Attach UID to request
                req.token = token;           // Attach token to request
                next();                      // Proceed
            })
            .catch(error => {
                console.error("Token verification failed:", error);
                return res.status(401).json({ error: "Unauthorized" });
            });
    }
}

module.exports = Authenticator;