class MatchService {
  constructor() {
    this.currentMatch = {
      team1: "India",
      team2: "Australia",
      score: "285/4 (45.2)",
      batsman: "Kohli - 102* (85)",
      bowler: "Starc - 1/48 (8)",
      overs: "45.2",
      target: "320",
    };
  }

  getMatchData() {
    return this.currentMatch;
  }

  updateMatchData(update) {
    this.currentMatch = { ...this.currentMatch, ...update };
    return this.currentMatch;
  }
}

module.exports = new MatchService();
