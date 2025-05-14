class QuestionModel {
    constructor(questionId, questionDescription, numerator, denominator) {
        this.questionId = questionId;
        this.questionDescription = questionDescription;
        this.numerator = numerator;
        this.denominator = denominator;
    }

    toFirestore() {
        return {
            questionDescription : this.questionDescription,
            numerator : this.numerator,
            denominator : this.denominator,
        };
    }
}

module.exports = QuestionModel;