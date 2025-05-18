const QuestionModel = require("../models/Question/QuestionModel");

class CreateQuestionDTO {
    constructor(questionName, questionDescription, numerator, denominator, probability, event = [],  createBy = null) {
        this.questionName = questionName;
        this.questionDescription = questionDescription;
        this.numerator = numerator;
        this.denominator = denominator;
        this.probability = probability;
        this.event = event;
        this.createBy = createBy;
    }
    setTeacherName(teacherName){
        this.createBy = teacherName;
    }
    setQuestionId(questionId) {
        this.questionId = questionId;
    }
    toQuestionModel() {
        return new QuestionModel(
            this.questionId,
            this.questionName,
            this.createBy,
            this.questionDescription,
            this.numerator,
            this.denominator,
            this.probability,
            this.event
        );
    }
    static fromRequestBody(body) {
        if (!body.questionName || typeof body.questionName !== 'string') {
            throw new Error("Invalid or missing questionName");
        }
        return new CreateQuestionDTO(
            body.questionName,
            body.questionDescription,
            body.numerator,
            body.denominator,
            body.probability,
            Array.isArray(body.event) ? body.event : [],
            body.createBy
        );
    }
}

module.exports = CreateQuestionDTO;