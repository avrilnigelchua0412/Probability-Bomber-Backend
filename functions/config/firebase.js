const admin = require('firebase-admin');

var serviceAccount = require("../../firebase-key/permissions.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db_helper = admin.firestore();
module.exports = { admin, db_helper }; // Export Firebase instance