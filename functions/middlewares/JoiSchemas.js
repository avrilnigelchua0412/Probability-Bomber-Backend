const Joi = require("joi");
class JoiSchemas {
    // Question
    static createQuestionSchema = Joi.object({
        questionName: Joi.string().required(),
        questionDescription: Joi.string().required(),
        numerator: Joi.number().required(),
        denominator: Joi.number().required(),
        probability: Joi.string().required(),
        event: Joi.array().items(Joi.string()).required()
    }).unknown(false);
    
    static editQuestionSchema = Joi.object({
        questionName: Joi.string().optional(),
        questionDescription: Joi.string().optional(),
        numerator: Joi.number().optional(),
        denominator: Joi.number().optional(),
        probability: Joi.string().optional(),
        event: Joi.array().items(Joi.string()).optional(),
        createdBy: Joi.string().optional(),
        originalQuestionName: Joi.string().required()
    }).unknown(false);

    // Quizzes
    static createQuizSchema = Joi.object({
        quizName: Joi.string().required(),
        topic: Joi.string().required(),
        level: Joi.number().positive().integer().required(),
        duration: Joi.number().positive().required(),
    }).unknown(false);

    static editQuizSchema = Joi.object({
        quizName: Joi.string().required(),
        topic: Joi.string().required(),
        level: Joi.number().positive().integer().required(),
        duration: Joi.number().positive().required(),
    }).unknown(false);

    static studentInformationSchema = Joi.object({
        quizName: Joi.string().required(),
        className: Joi.string().required(),
        studentName: Joi.string().required(),
        studentInformation: Joi.object()
            .pattern(
                Joi.string(), // classId
                Joi.object().pattern(
                    Joi.string(), // studentId
                    Joi.object({
                        score: Joi.number().optional(),
                        timeCompletion: Joi.number().optional(),
                        noAttempts: Joi.number().optional()
                    })
                )
            )
            .optional()
    }).unknown(false);
    
    // Student
    static addStudentAchievementsSchema = Joi.object({
        achievement: Joi.array().items(Joi.string()).required()
    }).unknown(false);

    // Authentication
    static userSchema = Joi.object({
        fullname : Joi.string().required(),
        username : Joi.string().required(),
        email : Joi.string().email().required(),
        password: Joi.string()
            .min(8)
            .max(128)
            .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+=-]*$"))
            .required()
            .messages({
                'string.min': 'Password must be at least 8 characters long',
                'string.max': 'Password must not exceed 128 characters',
                'string.pattern.base': 'Password contains invalid characters'
            }),
        confirm_password: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .strip()
            .messages({
                'any.only': 'Passwords do not match',
                'any.required': 'Confirm password is required'
            })
        // role : Joi.string().valid('teacher', 'student').required(),
    }).unknown(false);

    // Stage
    static addStageInformationSchema = Joi.object({
        score: Joi.number().required(),
        duration: Joi.number().required(),
        numberOfStars: Joi.number().required()
    }).unknown(false);
}

module.exports = JoiSchemas;