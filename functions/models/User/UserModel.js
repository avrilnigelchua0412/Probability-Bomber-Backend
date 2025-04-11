class UserModel {
    constructor(uid, name, email, createdAt, role){
        if (new.target === UserModel) {
            throw new TypeError("Cannot instantiate abstract class 'UserModel'.");
        }
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.role = role;
    }
    toFirestore(){
        return {
            name : this.name,
            email : this.email,
            createdAt : this.createdAt,
            role : this.role
        }
    }
    getUserRole(){
        return this.role;
    }
}
module.exports = UserModel;