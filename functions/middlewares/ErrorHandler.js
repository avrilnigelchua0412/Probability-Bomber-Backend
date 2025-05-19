class ErrorHandler {
    static errorHandler(err, req, res, next) {
        console.error("Unhandled error:", err);

        if (err.statusCode && err.message) {
            return res.status(err.statusCode).json({ error: err.message });
        }

        res.status(500).json({ error: "Something went wrong on the server." });
    }
}

module.exports = ErrorHandler;