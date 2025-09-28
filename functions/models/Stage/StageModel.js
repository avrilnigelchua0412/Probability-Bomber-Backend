class StageModel {
    constructor(username, score, duration, numberOfStars) {
        this.username = username;
        this.score = score;
        this.duration = duration;
        this.numberOfStars = numberOfStars;
    }
    toFirestore() {
        return {
            username: this.username,
            score: this.score,
            duration: this.duration,
            numberOfStars: this.numberOfStars
        };
    }
}

module.exports = StageModel;