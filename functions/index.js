const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const Application = require("./core/Application");
const StaticVariable = require("./config/StaticVariable");

const app = express();

// ✅ Define CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Allow tools like Postman
    if (StaticVariable.corsOrigin.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn(`❌ Blocked by CORS: ${origin}`);
      return callback(new Error("CORS not allowed for this origin"), false);
    }
  },
  methods: StaticVariable.corsMethod,
  allowedHeaders: StaticVariable.corsHeader,
  credentials: true,
};

// ✅ Apply CORS middleware globally
app.use(cors(corsOptions));

// ✅ Handle preflight (OPTIONS) for ALL routes safely
app.options(/.*/, cors(corsOptions), (req, res) => {
  res.sendStatus(204); // No content
});

// ✅ Mount your main Application router
const appInstance = new Application().getInstance();
app.use("/", appInstance);

// ✅ Export Firebase HTTPS function
exports.app = onRequest({ invoker: "public" },app);
