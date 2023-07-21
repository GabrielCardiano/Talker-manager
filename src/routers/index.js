const express = require('express');
const talkerRoute = require('./talker.route');
const loginRoute = require('./login.route');

const router = express.Router();

router.use(talkerRoute);
router.use(loginRoute);

module.exports = router;