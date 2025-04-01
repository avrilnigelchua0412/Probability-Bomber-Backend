const admin = require('firebase-admin');

var serviceAccount = require("../../firebase-key/permissions.json");


if (!admin.apps.length) { // Prevents re-initialization error
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
}

// console.log("🔥 Admin Initialized:", !!admin.apps.length);
// console.log("📂 Service Account Loaded:", serviceAccount ? "Yes" : "No");
// console.log("⏳ Firestore Timestamp:", admin.firestore.Timestamp.now());


const db_helper = admin.firestore();
module.exports = { admin, db_helper }; // Export Firebase instance