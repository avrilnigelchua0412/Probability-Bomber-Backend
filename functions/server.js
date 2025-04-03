require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const authenticate = require('./middleware/auth'); // Authentication middleware

const app = express();
app.use(cors({
    origin: true
    // origin: "*", // Allow all origins (adjust in production)
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Authorization", "Content-Type"]
}));

app.use(express.json()); // Allows parsing JSON requests

app.use((req, res, next) => {
    console.log("Path: ", req.path)
    if (req.path === "/api/user/register/") return next();
    if (req.path === "/api/user/login/") return next();
    authenticate(req, res, next);
});

// Mounting Route Should be Applied After Middleware
app.use('/api', routes); // Mount all routes under "/api"

app.get('/api/user/user-profile', (req, res) => {
    res.json({ message: "This route requires authentication!" });
});

// Default route
app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

module.exports = app; // Export app for Firebase functions