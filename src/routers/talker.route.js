const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const fileToRead = path.resolve(__dirname, '../talker.json');

async function readDocument() {
    const jsonTalkerData = await fs.readFile(fileToRead, 'utf-8');
    const jsTalkerData = JSON.parse(jsonTalkerData);
    return jsTalkerData;
}

const talkerRoute = express.Router();

talkerRoute.get('/talker', async (_req, res, next) => {
    try {
        const talkerData = await readDocument();

        if (talkerData) {
            return res.status(200).json(talkerData);
        }
        return res.status(200).json([]);
    } catch (error) {
        next(error);
    }
});

talkerRoute.get('/talker/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const talkerData = await readDocument();
        const talker = talkerData.find((t) => t.id === id);
        if (!talker) throw new Error();
        res.status(200).json(talker);
    } catch (error) {
        return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
});

talkerRoute.use((error, _req, res, _next) => {
    res.status(500).json({ message: error.message });
});

module.exports = talkerRoute;