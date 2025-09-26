const FirebaseService = require("../config/FirebaseService");

class Authenticator {
    static authenticate(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ error: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        FirebaseService.getAuth().verifyIdToken(token)
            .then(decodedToken => {
                // if(req.body['role'] !== undefined){
                //     req.role = req.body['role'];
                // }
                console.log("Body: ", req.body);
                console.log("Token: ", token);
                
                req.uid = decodedToken.uid;  // Attach UID to request
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