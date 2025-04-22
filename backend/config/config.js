module.exports = {
  PORT: process.env.PORT || 5000,
  RTMP_URL: "rtmp://localhost/live",
  STREAM_KEY: "cricket123",
  CORS_OPTIONS: {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
  },
};
