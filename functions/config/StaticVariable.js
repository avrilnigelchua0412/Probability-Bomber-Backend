class StaticVariable{
    static pathDefault = "/";
    
    static publicPaths = [
        "/",
        "/api/auth/register/",
        "/api/auth/forget_password/",
    ];
    
    static authPath = "/api/auth";
    static userPath = "/api/user";
    static teacherPath = "/api/teacher";
    static quizPath = "/api/quiz";
    static questionPath = "/api/question";
    static studentPath = "/api/student";
    static stagePath = "/api/stage";

    // static teacherRole = "teacher";
    static studentRole = "student";

    static collectionClass = "classes";
    static collectionQuestion = "questions";
    static collectionQuiz = "quizzes";
    static collectionTeacher = "teachers";
    static collectionStage = "stages";

    static corsHeader = ["Authorization", "Content-Type"];
    static corsMethod = ["GET", "POST", "PUT", "DELETE"];
    static corsOrigin = "*";

    static databaseURL = "https://fir-crud-restapi-6a058-default-rtdb.asia-southeast1.firebasedatabase.app";
}
module.exports = StaticVariable;