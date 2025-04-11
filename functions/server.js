const express = require("express");
const cors = require("cors");
const Path = require('./config/StaticPaths');
const Authenticator = require("./middlewares/AuthMiddleware");
const Validator = require("./middlewares/Validator")
const userRoutes = require("./routes/UserRoutes");
const authRoutes = require("./routes/AuthRoutes"); 

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Debugging!
app.use((req, res, next) => {
    console.log(`One Incoming request: ${req.method} ${req.path}`);
    next();
});
// Debugging!

app.use(cors({
    origin: "*", // Allow all origins (adjust in production)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"]
}));

// Debugging!
app.use((req, res, next) => {
    console.log(`Two Incoming request: ${req.method} ${req.path}`);
    next();
});
// Debugging!

app.use((req, res, next) => {
    if (Path.publicPaths.includes(req.path))
        return next();
    Authenticator.authenticate(req, res, next);
});

app.use("/api/auth/register/", Validator.validateUser);

// Debugging!
app.use((req, res, next) => {
    console.log(`Three Incoming request: ${req.method} ${req.path}`);
    next();
});
// Debugging!

// // Mounting Route Should be Applied After Middleware
// app.use('/api', routes); // Mount all routes under "/api"

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// app.get('/api/user/user-profile', (req, res) => {
//     res.json({ message: "This route requires authentication!" });
// });

// Default route
app.get('/', (req, res) => {
    res.status(200).send({
        message: "Hello World"
    });
});

module.exports = app; // Export app for Firebase functions