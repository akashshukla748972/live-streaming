import React, { useState, useEffect } from "react";
import { cricketWebSocket } from "../../services/websocket";
import "./ScoreCard.css";

const ScoreCard = () => {
  const [matchData, setMatchData] = useState({
    team1: "Loading...",
    team2: "Loading...",
    score: "Loading...",
    batsman: "Loading...",
    bowler: "Loading...",
  });

  useEffect(() => {
    let cleanup;

    const setupConnection = async () => {
      try {
        cleanup = cricketWebSocket.on("MATCH_DATA", setMatchData);
        await cricketWebSocket.connect();
      } catch (error) {
        console.log("Connection failed, retrying...");
        setTimeout(setupConnection, 3000);
      }
    };

    setupConnection();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="score-card">
      <h2>
        {matchData.team1} vs {matchData.team2}
      </h2>
      <div className="score-details">
        <p>
          <strong>Score:</strong> {matchData.score}
        </p>
        <p>
          <strong>Batsman:</strong> {matchData.batsman}
        </p>
        <p>
          <strong>Bowler:</strong> {matchData.bowler}
        </p>
      </div>
    </div>
  );
};

export default ScoreCard;
