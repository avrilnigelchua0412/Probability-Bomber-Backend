const admin = require("firebase-admin");

var serviceAccount = require("../firebase-key/permissions.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount), // Load service account key
        databaseURL: "https://fir-crud-restapi-6a058-default-rtdb.asia-southeast1.firebasedatabase.app"
    });
}

const dbHelper = admin.firestore(); // Firestore instance
const auth = admin.auth(); // Firebase Auth instance

module.exports = { dbHelper, auth }; // Export Firestore and Auth
