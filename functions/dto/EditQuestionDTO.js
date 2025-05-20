const QuestionModel = require("../models/Question/QuestionModel");

class EditQuestionDTO {
    // questionName, questionDescription, numerator, denominator, probability, event, originalQuestionName
    constructor(questionName, questionDescription, numerator, denominator, probability, event = [], originalQuestionName,  createdBy) {
        this.questionName = questionName;
        this.questionDescription = questionDescription;
        this.numerator = numerator;
        this.denominator = denominator;
        this.probability = probability;
        this.event = event;
        this.originalQuestionName = originalQuestionName;
        this.createdBy = createdBy;
    }
    setQuestionId(questionId) {
        this.questionId = questionId;
    }
    toQuestionModel() {
        return new QuestionModel(
            this.questionId,
            this.questionName,
            this.createdBy,
            this.questionDescription,
            this.numerator,
            this.denominator,
            this.probability,
            this.event
        );
    }
    static fromRequestBody(body) {
        if (!body.originalQuestionName || typeof body.originalQuestionName !== 'string') {
            throw new Error("Invalid or missing originalQuestionName");
        }
        return new EditQuestionDTO(
            body.questionName,
            body.questionDescription,
            body.numerator,
            body.denominator,
            body.probability,
            Array.isArray(body.event) ? body.event : [],
            body.originalQuestionName,
            body.createdBy
        );
    }
}

module.exports = EditQuestionDTO;