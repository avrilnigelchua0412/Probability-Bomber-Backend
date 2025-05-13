class ClassModel {
    constructor(classId, className, teacherUid,
        quizIds = [], studentUids = []) {
        this.classId = classId;
        this.className = className;
        this.teacherUid = teacherUid;
        this.quizIds = quizIds;
        this.studentUids = studentUids; // Array of student UIDs
    }

    toFirestore() {
        return {
            className: this.className,
            teacherUid: this.teacherUid,
            quizIds: this.quizIds,
            studentUids: this.studentUids
        };
    }
}

module.exports = ClassModel;