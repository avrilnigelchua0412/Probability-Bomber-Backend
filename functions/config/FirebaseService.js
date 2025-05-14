const admin = require("firebase-admin");
const serviceAccount = require("../../firebase-key/permissions.json");
const StaticVariable = require("./StaticVariable")

class FirebaseService {
    constructor() {
        this.admin = admin;
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

    getFieldValue() {
        return this.admin.firestore.FieldValue;
    }
    
    getAdmin(){
        return this.admin;
    }

    async deleteDocument(collection, docId) {
        try {
            await this.db.collection(collection).doc(docId).delete();
            console.log(`Document with ID ${docId} deleted from collection ${collection}.`);
        } catch (error) {
            console.error("Error deleting document:", error);
            throw error;
        }
    }

    async getRef(collection, id){
        return this.getDB().collection(collection).doc(id);
    }
}

module.exports = new FirebaseService();