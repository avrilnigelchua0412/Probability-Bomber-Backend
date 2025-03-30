const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json()); // Allows parsing JSON requests

app.use('/api', routes); // Mount all routes under "/api"

// Default route
app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

module.exports = app; // Export app for Firebase functions
