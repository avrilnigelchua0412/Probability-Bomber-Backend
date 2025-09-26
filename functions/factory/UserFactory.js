const TeacherModel = require('../models/User/TeacherModel');
const StudentModel = require('../models/User/StudentModel');

class UserFactory {
    static instantiateUser(uid, fullname, username, email, createdAt) {
        return new StudentModel(uid, fullname, username, email, createdAt);
        // switch (role) {
        //     case 'teacher':
        //         return new TeacherModel(uid, name, email, createdAt);
        //     case 'student':
        //         return new StudentModel(uid, name, email, createdAt);
        //     default:
        //         throw new Error(`Unknown user role: ${role}`);
        // }
    }
}

module.exports = UserFactory;
