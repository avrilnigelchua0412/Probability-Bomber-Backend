class UserModel {
    constructor(uid, fullname, username, email, createdAt){
        if (new.target === UserModel) {
            throw new TypeError("Cannot instantiate abstract class 'UserModel'.");
        }
        this.uid = uid;
        this.fullname = fullname;
        this.username = username;
        this.email = email;
        this.createdAt = createdAt;
        // this.role = role;
    }
    toFirestore(){
        return {
            fullname : this.fullname,
            username : this.username,
            email : this.email,
            createdAt : this.createdAt
            // role : this.role
        }
    }
    // getUserRole(){
    //     return this.role;
    // }
}

module.exports = UserModel;