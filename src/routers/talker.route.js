const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const fileToRead = path.resolve(__dirname, '../talker.json');


async function readDocument() {
    const jsonTalkerData = await fs.readFile(fileToRead, 'utf-8');
    const jsTalkerData = JSON.parse(jsTalkerData); 
    return jsTalkerData;
}


const talkerRoute = express.Router();

talkerRoute.get('/talker', async (_req, res, next) => {
    try {
        const talkerData = await readDocument();
        res.status(200).json(talkerData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// talkerRoute.use((error, req, res, next) => {
//     res.status(500).json({ message: error.message })
// })

module.exports = talkerRoute;