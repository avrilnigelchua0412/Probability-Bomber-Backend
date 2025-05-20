const QuizModel = require("../models/Quiz/QuizModel");
const StudentInformationHelper = require("./StudentInformationHelper");

class CreateQuizDTO {
    constructor(
        quizName,
        topic,
        level,
        duration,
        createdBy = null,
        classIds = [],
        questions = [],
        studentIdsByClass = {}
    ) {
        this.quizName = quizName;
        this.topic = topic;
        this.level = level;
        this.duration = duration;
        this.createdBy = createdBy;
        this.classIds = classIds;
        this.questions = questions;
        this.studentInformation = StudentInformationHelper.createDefault(classIds, studentIdsByClass);
    }
    setQuizId(quizId){
        this.quizId = quizId;
    }
    setCreatedBy(teacherName){
        this.createdBy = teacherName;
    }
    toQuizModel(){
        return new QuizModel(
            this.quizId,
            this.quizName,
            this.topic,
            this.level,
            this.duration,
            this.createdBy,
            this.classIds,
            this.questions,
            this.studentInformation
        );
    }
    setClassIds(classIds) {
        this.classIds = classIds;
    }
    setStudentIdsByClass(studentIdsByClass) {
        this.studentIdsByClass = studentIdsByClass;
    }
    regenerateStudentInformation() {
        this.studentInformation = StudentInformationHelper.createDefault(this.classIds, this.studentIdsByClass);
    }
    static fromRequestBody(body) {
        return new CreateQuizDTO(
            body.quizName,
            body.topic,
            body.level,
            body.duration,
            body.createdBy || null,
            body.classIds || [],
            body.questions || [],
            body.studentIdsByClass || {}
        )
    }

}

module.exports = CreateQuizDTO;