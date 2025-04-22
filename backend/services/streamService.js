const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

class StreamService {
  constructor() {
    this.streams = new Map();
  }

  startStream(streamKey, options = {}) {
    const outputPath = path.join(
      __dirname,
      "../../public/streams",
      `${streamKey}.m3u8`
    );

    const command = ffmpeg()
      .input(options.input || "rtmp://localhost/live/" + streamKey)
      .outputOptions([
        "-c:v libx264",
        "-c:a aac",
        "-hls_time 10",
        "-hls_list_size 6",
        "-hls_wrap 10",
        "-start_number 1",
      ])
      .output(outputPath)
      .on("start", () => console.log(`Stream started: ${streamKey}`))
      .on("error", (err) => console.error(`Stream error: ${err.message}`));

    command.run();
    this.streams.set(streamKey, command);
  }

  stopStream(streamKey) {
    if (this.streams.has(streamKey)) {
      this.streams.get(streamKey).kill();
      this.streams.delete(streamKey);
    }
  }
}

module.exports = new StreamService();
