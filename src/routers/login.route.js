const express = require('express');
const crypto = require('crypto');

const loginRoute = express.Router();

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

loginRoute.post('/login', async (req, res) => {
    const randomToken = tokenGenerator();
    return res.status(200).json({ token: randomToken });
});

module.exports = loginRoute;