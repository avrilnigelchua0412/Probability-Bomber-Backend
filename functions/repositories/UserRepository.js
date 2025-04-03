const { dbHelper } = require("../dbHelper");
const UserModel = require("../models/UserModel");

class UserRepository{
    static async createUser(uid, userData){
        if(userData instanceof UserModel){ // Explicit, since there is no typecasting!
            await dbHelper.collection("users").doc(uid).set(userData.toFirestore());
        }
    }
    static async getUserId(uid){
        const userDoc = await dbHelper.collection("users").doc(uid).get();
        return userDoc.exists ? userDoc.data() : null;
    }
}

module.exports = UserRepository;