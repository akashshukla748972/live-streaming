const matchService = require("../services/matchService");
const websocket = require("../utils/websocket");

exports.getMatchData = (req, res) => {
  try {
    const matchData = matchService.getMatchData();
    res.status(200).json(matchData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMatchData = (req, res) => {
  try {
    const updatedData = matchService.updateMatchData(req.body);
    websocket.broadcast("MATCH_UPDATE", updatedData);
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
