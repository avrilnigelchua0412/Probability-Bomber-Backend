const FirebaseService = require("../config/FirebaseService");
const UserModel = require("../models/User/UserModel");

class UserRepository{
    static async createUser(uid, userData){
        if(userData instanceof UserModel){ // Explicit, since there is no typecasting!
            await FirebaseService.getDB().collection(userData.getUserRole()).doc(uid).set(userData.toFirestore());
        }
    }
    static async getUserDocument(uid, role) {
        if (!role) throw new Error(`Role is null!`);
        return FirebaseService.getDB().collection(role).doc(uid);
    }

    static async getUserData(uid, role) {
        if (!role) throw new Error(`Role is null!`);
        
        const userDocRef = await UserRepository.getUserDocument(uid, role); // Get DocumentReference
        const userDocSnap = await userDocRef.get(); // Get DocumentSnapshot
    
        if (!userDocSnap.exists) throw new Error(`User document not found for UID: ${uid}`);
        
        return userDocSnap.data(); // Return document data
    }
}

module.exports = UserRepository;