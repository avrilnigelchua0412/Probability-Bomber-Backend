const FirebaseService = require("../config/FirebaseService");
const UserModel = require("../models/User/UserModel");

class UserRepository{
    static async createUser(uid, userData){
        if(userData instanceof UserModel){ // Explicit, since there is no typecasting!
            await FirebaseService.db.collection(userData.getUserRole()).doc(uid).set(userData.toFirestore());
        }
    }
    static async getUserId(uid){
        const userDoc = await FirebaseService.db.collection(userData.getUserRole()).doc(uid).get();
        return userDoc.exists ? userDoc.data() : null;
    }
}

module.exports = UserRepository;