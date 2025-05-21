class ValidationHandler {
    static handleValidationError(res, error) {
        return res.status(400).json({
            error: error?.details?.map(d => d.message) || ["Unknown validation error"],
        });
    }
}

module.exports = ValidationHandler