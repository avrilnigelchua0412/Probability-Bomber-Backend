class ClassModel {
    constructor(classId, className, teacherUid, studentUids = []) {
        this.classId = classId;
        this.className = className;
        this.teacherUid = teacherUid;
        this.studentUids = studentUids; // Array of student UIDs
    }

    toFirestore() {
        return {
            className: this.className,
            teacherUid: this.teacherUid,
            studentUids: this.studentUids
        };
    }
}

module.exports = ClassModel;