class StageModel {
    constructor(username, stageNumber, score, duration, numberOfStars, createdAt) {
        this.username = username;
        this.stageNumber = stageNumber;
        this.score = score;
        this.duration = duration;
        this.numberOfStars = numberOfStars;
        this.createdAt = createdAt;
    }
    toFirestore() {
        return {
            username: this.username,
            stageNumber: this.stageNumber,
            score: this.score,
            duration: this.duration,
            numberOfStars: this.numberOfStars,
            createdAt: this.createdAt
        };
    }
}

module.exports = StageModel;