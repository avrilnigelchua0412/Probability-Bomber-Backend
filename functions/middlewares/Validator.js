const JoiSchemas = require("./JoiSchemas");
const ValidationHandler = require("./ValidationHandler");
class Validator {
    // Question
    static validateCreateQuestion(req, res, next){
        const { error, value } = JoiSchemas.createQuestionSchema.validate(req.body, { abortEarly: false })
        if (error) return ValidationHandler.handleValidationError(res, error);
        req.validatedBody = value;
        next();
    }

    static validateEditQuestion(req, res, next){
        const { error, value } = JoiSchemas.editQuestionSchema.validate(req.body, { abortEarly: false })
        if (error) return ValidationHandler.handleValidationError(res, error);
        req.validatedBody = value;
        next();
    }

    // Quiz
    static validateCreateQuiz(req, res, next){
        const { error, value } = JoiSchemas.createQuizSchema.validate(req.body, { abortEarly: false })
        if (error) return ValidationHandler.handleValidationError(res, error);
        req.validatedBody = value;
        next();
    }

    static validateEditQuiz(req, res, next){
        const { error, value } = JoiSchemas.createQuizSchema.validate(req.body, { abortEarly: false })
        if (error) return ValidationHandler.handleValidationError(res, error);
        req.validatedBody = value;
        next();
    }

    static validateStudentInformation(req, res, next){
        const { error, value } = JoiSchemas.studentInformationSchema.validate(req.body, { abortEarly: false })
        if (error) return ValidationHandler.handleValidationError(res, error);
        req.validatedBody = value;
        next();
    }

    // Student
    static validateAddStudentAchievements(req, res, next) {
        const { error, value } = JoiSchemas.addStudentAchievementsSchema.validate(req.body, { abortEarly: false });
        if (error) return ValidationHandler.handleValidationError(res, error);
        req.validatedBody = value;
        next();
    }
    static validateGetStudentAchievements(req, res, next) {
        const { error, value } = JoiSchemas.getStudentAchievementsSchema.validate(req.body, { abortEarly: false });
        if (error) return ValidationHandler.handleValidationError(res, error);
        req.validatedBody = value;
        next();
    }

    // Authentication
    static validateUser(req, res, next) {
        const { error } = JoiSchemas.userSchema.validate(req.body, { abortEarly: false })
        if (error) return ValidationHandler.handleValidationError(res, error);
        next();
    };
}
module.exports = Validator;