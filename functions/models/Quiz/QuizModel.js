class QuizModel {
    constructor(
        quizId,
        quizName,
        topic,
        level,
        duration,
        createdBy,
        classIds = [],
        questions = [],
        studentInformation = {}
    ) {
        this.quizId = quizId;
        this.quizName = quizName;
        this.topic = topic;
        this.level = level;
        this.duration = duration;
        this.createdBy = createdBy;
        this.classIds = classIds;
        this.questions = questions;
        this.studentInformation = studentInformation;
    }

    toFirestore() {
        return {
            quizName: this.quizName,
            topic: this.topic,
            level: this.level,
            duration: this.duration,
            createdBy: this.createdBy,
            classIds: this.classIds,
            questions: this.questions,
            studentInformation: this.studentInformation
        };
    }
}

module.exports = QuizModel;