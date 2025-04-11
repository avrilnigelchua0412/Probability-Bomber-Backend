const UserModel = require("./UserModel");

class StudentModel extends UserModel {
    constructor(uid, name, email, createdAt, classId = null) {
        super(uid, name, email, createdAt, 'student');
        this.classId = classId; // ID of the class the student is in
    }

    assignClass(classId) {
        this.classId = classId;
    }

    toFirestore() {
        return {
            ...super.toFirestore(),
            classId: this.classId
        };
    }
}

module.exports = StudentModel;