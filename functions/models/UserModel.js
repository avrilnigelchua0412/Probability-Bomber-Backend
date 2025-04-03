class UserModel {
    constructor(uid, name, email, createdAt){
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt
    }
    toFirestore(){
        return {
            name : this.name,
            email : this.email,
            createdAt : this.createdAt
        }
    }
}
module.exports = UserModel;