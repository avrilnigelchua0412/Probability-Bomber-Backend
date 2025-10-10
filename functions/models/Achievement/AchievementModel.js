class AchievementModel {
    constructor(username, achievements = []) {
        this.username = username;
        this.achievements = achievements;
    }
    toFirestore() {
        return {
            username: this.username,
            achievements: this.achievements
        };
    }
}
module.exports = AchievementModel;