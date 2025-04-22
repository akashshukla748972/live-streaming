const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");

router.get("/", matchController.getMatchData);
router.post("/update", matchController.updateMatchData);

module.exports = router;
