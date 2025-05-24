const UserModel = require("./UserModel");

class StudentModel extends UserModel {
    constructor(uid, name, email, createdAt, classId = null, achievements = []) {
        super(uid, name, email, createdAt, 'student');
        this.classId = classId; // ID of the class the student is in
        this.achievements = achievements
    }

    assignClass(classId) {
        this.classId = classId;
    }

    toFirestore() {
        return {
            ...super.toFirestore(),
            classId: this.classId,
            achievements: this.achievements
        };
    }
}

module.exports = StudentModel;