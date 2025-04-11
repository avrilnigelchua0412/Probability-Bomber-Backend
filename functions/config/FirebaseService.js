const admin = require("firebase-admin");
const serviceAccount = require("../../firebase-key/permissions.json");

class FirebaseService {
    static #appInstance = null;

    static init() {
        if (!FirebaseService.#appInstance) {
            FirebaseService.#appInstance = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://fir-crud-restapi-6a058-default-rtdb.asia-southeast1.firebasedatabase.app"
            });
        }
    }

    static get db() {
        FirebaseService.init();
        return admin.firestore();
    }

    static get auth() {
        FirebaseService.init();
        return admin.auth();
    }
}

module.exports = FirebaseService;