const express = require("express");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const NodeMediaServer = require("node-media-server");

const app = express();

// CORS Setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://live-streaming-khaki.vercel.app/",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// API Endpoint
app.get("/api/stream/url", (req, res) => {
  res.json({
    rtmpUrl: "rtmp://localhost/live",
    streamKey: "cricket123",
    hlsUrl: "http://localhost:8000/live/cricket123.flv",
  });
});

// WebSocket Server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("New WebSocket client connected");

  // Send initial match data
  ws.send(
    JSON.stringify({
      type: "MATCH_DATA",
      data: {
        team1: "India",
        team2: "Australia",
        score: "285/4 (45.2)",
        batsman: "Kohli - 102* (85)",
        bowler: "Starc - 1/48 (8)",
      },
    })
  );

  ws.on("close", () => console.log("Client disconnected"));
});

// RTMP Server
const nms = new NodeMediaServer({
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: "*",
  },
});

// Start servers
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
  console.log(`WebSocket Server running on ws://localhost:${PORT}`);
  nms.run();
  console.log("RTMP Server running on port 1935");
});
