class StaticVariable{
    static pathDefault = "/";
    
    static publicPaths = [
        "/",
        "/api/auth/register/",
        "/api/auth/forget_password/"
    ];
    
    static authPath = "/api/auth";
    static userPath = "/api/user";


    static corsHeader = ["Authorization", "Content-Type"];
    static corsMethod = ["GET", "POST", "PUT", "DELETE"];
    static corsOrigin = "*"
}
module.exports = StaticVariable;