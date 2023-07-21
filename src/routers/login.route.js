const express = require('express');
const tokenGenerator = require('../utils/tokenGenerator');
const { validateEmail, validatePassword } = require('../middlewares/validateLogin');

const loginRoute = express.Router();

loginRoute.post('/login', validateEmail, validatePassword, async (req, res) => {
    const randomToken = tokenGenerator();
    return res.status(200).json({ token: randomToken });
});

module.exports = loginRoute;