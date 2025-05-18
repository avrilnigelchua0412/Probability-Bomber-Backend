class QuestionModel {
    constructor(questionId, questionName, createBy, questionDescription, numerator, denominator, probability, event = []) {
        this.questionId = questionId;
        this.questionName = questionName;
        this.questionDescription = questionDescription;
        this.numerator = numerator;
        this.denominator = denominator;
        this.probability = probability;
        this.event = event;
        this.createBy = createBy;
    }

    toFirestore() {
        return {
            questionName : this.questionName,
            questionDescription : this.questionDescription,
            numerator : this.numerator,
            denominator : this.denominator,
            probability : this.probability,
            event : this.event,
            createBy: this.createBy
        };
    }
}

module.exports = QuestionModel;