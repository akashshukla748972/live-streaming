// In your backend server setup
const WebSocket = require("ws");

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("New WebSocket client connected");

    // Send initial data
    ws.send(
      JSON.stringify({
        type: "CONNECTION_ESTABLISHED",
        data: { message: "Welcome to Cricket Live Updates" },
      })
    );

    ws.on("close", () => {
      console.log("Client disconnected");
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  return wss;
};
