const express = require('express');
const brewRatio = require('./brew-ratio');

const router = express.Router();

router.post('/brew-ratio', brewRatio);

module.exports = router;
