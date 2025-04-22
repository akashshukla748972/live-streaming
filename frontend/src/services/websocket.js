export class CricketWebSocket {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (
        this.socket &&
        [WebSocket.OPEN, WebSocket.CONNECTING].includes(this.socket.readyState)
      ) {
        resolve();
        return;
      }

      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        console.log("WebSocket connected");
        this.reconnectAttempts = 0;
        resolve();
      };

      this.socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const handlers = this.listeners.get(message.type) || [];
          handlers.forEach((handler) => handler(message.data));
        } catch (error) {
          console.error("Error processing message:", error);
        }
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        reject(error);
      };

      this.socket.onclose = () => {
        console.log("WebSocket disconnected");
        this.attemptReconnect();
      };
    });
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Reconnecting (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
      );
      setTimeout(() => this.connect(), 3000);
    }
  }

  on(eventType, handler) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(handler);

    return () => {
      const handlers = this.listeners.get(eventType) || [];
      this.listeners.set(
        eventType,
        handlers.filter((h) => h !== handler)
      );
    };
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const cricketWebSocket = new CricketWebSocket("ws://localhost:5000");
