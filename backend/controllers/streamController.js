const streamService = require("../services/streamService");
const config = require("../config/config");

exports.startStream = (req, res) => {
  try {
    streamService.startStream(config.STREAM_KEY);
    res.status(200).json({ message: "Stream started successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.stopStream = (req, res) => {
  try {
    streamService.stopStream(config.STREAM_KEY);
    res.status(200).json({ message: "Stream stopped successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStreamUrl = (req, res) => {
  res.status(200).json({
    url: `${config.RTMP_URL}/${config.STREAM_KEY}`,
    hlsUrl: `/streams/${config.STREAM_KEY}.m3u8`,
  });
};
