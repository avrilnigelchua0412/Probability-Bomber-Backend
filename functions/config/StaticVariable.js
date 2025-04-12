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

    static teacherRole = "teacher";
    static studentRole = "student";

    static collectionClass = "classes";

    static corsHeader = ["Authorization", "Content-Type"];
    static corsMethod = ["GET", "POST", "PUT", "DELETE"];
    static corsOrigin = "*";

    static databaseURL = "https://fir-crud-restapi-6a058-default-rtdb.asia-southeast1.firebasedatabase.app";
}
module.exports = StaticVariable;