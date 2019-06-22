const express = require('express');
const brewRatio = require('./brew-ratio');
const brewRatioCups = require('./brew-ratio-cups');

const router = express.Router();

router.post('/brew-ratio', brewRatio);
router.post('/brew-ratio-cups', brewRatioCups);

module.exports = router;
