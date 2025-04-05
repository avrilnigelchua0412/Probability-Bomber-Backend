const express = require("express");
const cors = require("cors");
const { dbHelper, auth } = require("./dbHelper"); // Import Firestore & Auth
// const { secretKey } = require("./config"); // Import secret key
const authenticate = require("./middlewares/authMiddleware"); // Auth middleware
const userRoutes = require("./routes/UserRoutes"); // User routes
const authRoutes = require("./routes/AuthRoutes"); // User routes
// const { Message } = require("firebase-functions/pubsub");

const app = express();
app.use(express.json()); // Middleware to parse JSON

// console.log("Secret Key:", secretKey); // Check if secret key loads correctly

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
    console.log("Path: ", req.path)
    if (req.path === "/api/auth/register/") return next();
    if (req.path === "/") return next();
    authenticate(req, res, next);
});


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