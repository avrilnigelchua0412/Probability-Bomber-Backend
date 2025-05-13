class QuizModel {
    constructor(quizId, quizName, createdBy, 
        classIds = [], questions = [], studentScores = {}) {
        this.quizId = quizId;
        this.quizName = quizName;
        this.createdBy = createdBy;
        this.classIds = classIds;
        this.questions = questions;
        this.studentScores = studentScores; 
        // Nested map: { classUID: { studentUID: score } }
    }

    toFirestore() {
        return {
            quizName: this.quizName,
            createdBy: this.createdBy,
            classIds: this.classIds,
            questions: this.questions,
            studentScores: this.studentScores
        };
    }
}

module.exports = QuizModel;