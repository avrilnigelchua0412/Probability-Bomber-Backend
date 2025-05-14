class QuestionModel {
    constructor(questionId, questionName, questionDescription, numerator, denominator) {
        this.questionId = questionId;
        this.questionName = questionName;
        this.questionDescription = questionDescription;
        this.numerator = numerator;
        this.denominator = denominator;
    }

    toFirestore() {
        return {
            questionName : this.questionName,
            questionDescription : this.questionDescription,
            numerator : this.numerator,
            denominator : this.denominator,
        };
    }
}

module.exports = QuestionModel;