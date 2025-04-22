const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./config/config");
const streamRoutes = require("./routes/streamRoutes");
const matchRoutes = require("./routes/matchRoutes");
const websocket = require("./utils/websocket");

const app = express();

// Middleware
app.use(cors(config.CORS_OPTIONS));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/stream", streamRoutes);
app.use("/api/match", matchRoutes);

module.exports = { app, websocket };
