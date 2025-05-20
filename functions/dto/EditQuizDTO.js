class EditQuizDTO {
    constructor( quizName, topic, level, duration){
        this.quizName = quizName;
        this.topic = topic;
        this.level = level;
        this.duration = duration;
    }
    getTopic(){
        return this.topic;
    }
    getLevel(){
        return this.level;
    }
    getDuration(){
        return this.duration;
    }
    static fromRequestBody(body) {
        return new EditQuizDTO(
            body.quizName,
            body.topic,
            body.level,
            body.duration
        )
    }
}

module.exports = EditQuizDTO;