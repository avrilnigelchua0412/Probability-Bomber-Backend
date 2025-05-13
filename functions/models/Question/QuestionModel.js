class QuestionModel {
    constructor(questionUID, questionDescription, numerator, denominator) {
        this.questionUID = questionUID;
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