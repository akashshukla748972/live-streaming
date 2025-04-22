const express = require('express');
const router = express.Router();
const streamController = require('../controllers/streamController');

router.post('/start', streamController.startStream);
router.post('/stop', streamController.stopStream);
router.get('/url', streamController.getStreamUrl);

module.exports = router;