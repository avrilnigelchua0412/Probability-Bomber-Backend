const UserModel = require("./UserModel");

class TeacherModel extends UserModel {
    constructor(uid, name, email, createdAt, classes = []) {
        super(uid, name, email, createdAt, 'teacher');
        this.classes = classes; // Array of ClassModel instances
    }

    toFirestore() {
        return {
            ...super.toFirestore(),
            classes: this.classes.map(cls => cls.toFirestore())
        };
    }
}

module.exports = TeacherModel;