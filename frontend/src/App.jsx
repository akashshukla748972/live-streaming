import React from "react";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import LiveStream from "./components/LiveStream/LiveStream";
import ScoreCard from "./components/ScoreCard/ScoreCard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header title="Cricket Live Streaming" />

      <main className="main-content">
        <div className="stream-section">
          <LiveStream />
        </div>

        <div className="score-section">
          <ScoreCard />
        </div>
      </main>

      <Footer copyright="© 2023 Cricket Streaming" />
    </div>
  );
}

export default App;
