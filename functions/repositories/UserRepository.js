const FirebaseService = require("../config/FirebaseService");
const StaticVariable = require("../config/StaticVariable");
const UserModel = require("../models/User/UserModel");

class UserRepository{
    static async createUser(uid, userData){
        if(userData instanceof UserModel){ // Explicit, since there is no typecasting!
            await FirebaseService.getDB().collection(StaticVariable.studentRole).doc(uid).set(userData.toFirestore());
        }
    }
    static async getUserDocument(uid) {
        // if (!role) throw new Error(`Role is null!`);
        // return FirebaseService.getDB().collection(role).doc(uid);
        return FirebaseService.getDB().collection(StaticVariable.studentRole).doc(uid);
    }

    static async getUserData(uid) {
        // if (!role) throw new Error(`Role is null!`);
        
        const userDocRef = await UserRepository.getUserDocument(uid); // Get DocumentReference
        const userDocSnap = await userDocRef.get(); // Get DocumentSnapshot
    
        if (!userDocSnap.exists) throw new Error(`User document not found for UID: ${uid}`);
        
        return userDocSnap.data(); // Return document data
    }
}

module.exports = UserRepository;