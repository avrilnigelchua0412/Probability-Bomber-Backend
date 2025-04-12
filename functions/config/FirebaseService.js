const admin = require("firebase-admin");
const serviceAccount = require("../../firebase-key/permissions.json");
const StaticVariable = require("./StaticVariable")

class FirebaseService {
    constructor() {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: StaticVariable.databaseURL
            });
        }

        this.db = admin.firestore();
        this.auth = admin.auth();
    }

    getDB() {
        return this.db;
    }

    getAuth() {
        return this.auth;
    }
}

module.exports = new FirebaseService();