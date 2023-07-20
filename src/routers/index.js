const express = require('express');

const router = express.Router();

const talkerRoute = require('./talker.route');

router.use(talkerRoute);

module.exports = router;