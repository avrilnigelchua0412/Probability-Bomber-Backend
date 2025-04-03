const admin = require('firebase-admin');

var serviceAccount = require("../../firebase-key/permissions.json");

const secretKey = process.env.JWT_SECRET;
console.log("Secret Key! ", secretKey);
// console.log("Permissions! ", serviceAccount);


if (!admin.apps.length) { // Prevents re-initialization error
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://fir-crud-restapi-6a058-default-rtdb.asia-southeast1.firebasedatabase.app"
    });
};

// console.log("🔥 Admin Initialized:", !!admin.apps.length);
// console.log("📂 Service Account Loaded:", serviceAccount ? "Yes" : "No");
// console.log("⏳ Firestore Timestamp:", admin.firestore.Timestamp.now());

const dbHelper = admin.firestore();
const auth = admin.auth()
module.exports = { admin, auth, dbHelper, secretKey }; // Export Firebase instance