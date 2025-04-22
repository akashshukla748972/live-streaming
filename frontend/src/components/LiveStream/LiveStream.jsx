import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { getStreamUrl } from "../../services/api";
import "./LiveStream.css";

const LiveStream = () => {
  const [streamUrl, setStreamUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStreamUrl = async () => {
      try {
        const response = await getStreamUrl();
        setStreamUrl(response.hlsUrl);
      } catch (err) {
        setError("Failed to load stream. Please try again later.");
        console.error("Stream URL error:", err);
      }
    };

    fetchStreamUrl();
  }, []);

  return (
    <div className="live-stream-container">
      {error ? (
        <div className="stream-error">
          {error}
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      ) : streamUrl ? (
        <ReactPlayer
          url={streamUrl}
          playing
          controls
          width="100%"
          height="auto"
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
        />
      ) : (
        <div className="stream-loading">Loading stream...</div>
      )}
    </div>
  );
};

export default LiveStream;
