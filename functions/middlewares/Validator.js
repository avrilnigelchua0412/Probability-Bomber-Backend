const JoiSchemas = require("./JoiSchemas");

class Validator {
    // Question
    static validateCreateQuestion(req, res, next){
        const { error, value } = JoiSchemas.createQuestionSchema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                error: error.details.map(detail => detail.message),
            });
        }
        req.validatedBody = value;
        next();
    }

    static validateEditQuestion(req, res, next){
        const { error, value } = JoiSchemas.editQuestionSchema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                error: error.details.map(detail => detail.message),
            });
        }
        req.validatedBody = value;
        next();
    }

    // Authentication
    static validateUser(req, res, next) {
        const { error } = JoiSchemas.userSchema.validate(req.body, { abortEarly: false })
        if (error) {
            const messages = error.details.map(detail => detail.message);
            return res.status(400).json({ error: messages });
        }
        next();
    };
}
module.exports = Validator;