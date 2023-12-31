const express = require('express');
const { readDocument, writeDocument } = require('../utils/readAndWriteDocument');
const { queryByName, queryByDate, queryByRate } = require('../utils/queryFunctions');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const {
  validateTalk,
  validatewatchedAt,
  validateRate,
  validateRateForPatch,
  validateQueryByRate,
  validateQueryByDate,
  // validateQueryByDate,
} = require('../middlewares/validateTalk');
const findAll = require('../database/talkersDB');

const talkerRoute = express.Router();

talkerRoute.get('/talker/search',
  validateToken,
  validateQueryByRate,
  validateQueryByDate,
  async (req, res, next) => {
    const { q, rate, date } = req.query;
    try {
      let searchByName = await queryByName(q);
      
      if (rate) {
        searchByName = queryByRate(searchByName, rate);
        }
      if (date) {
        searchByName = queryByDate(searchByName, date);
      }
        return res.status(200).json(searchByName);
    } catch (error) {
      next();
    }
  });

talkerRoute.get('/talker/db', async (req, res, next) => {
  try {
    const talkersDB = await findAll();

    if (talkersDB) {
      return res.status(200).json(talkersDB);
    }
    return res.status(200).json([]);
  } catch (error) {
    next(error);
  }
});

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

talkerRoute.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validatewatchedAt,
  validateRate,
  async (req, res, next) => {
    try {
      const talkers = await readDocument();
      const newID = talkers.length + 1;
      const newtalker = { id: newID, ...req.body };
      talkers.push(newtalker);
      await writeDocument(talkers);
      return res.status(201).json(newtalker);
    } catch (error) {
      next(error);
    }
  });

talkerRoute.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validatewatchedAt,
  validateRate,
  async (req, res) => {
    const talkers = await readDocument();
    const id = Number(req.params.id);
    const updateTalker = { id, ...req.body };

    if (!talkers.some((talker) => talker.id === id)) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    const index = talkers.findIndex((talker) => talker.id === id);
    talkers[index] = updateTalker;
    await writeDocument(talkers);
    return res.status(200).json(updateTalker);
  });

talkerRoute.delete('/talker/:id', validateToken, async (req, res) => {
  const talkers = await readDocument();
  const id = Number(req.params.id);

  const removeTalker = talkers.filter((talker) => talker.id !== id);
  await writeDocument(removeTalker);

  return res.status(204).end();
});

talkerRoute.patch('/talker/rate/:id',
  validateToken,
  validateRateForPatch,
  async (req, res) => {
    const talkers = await readDocument();
    const id = Number(req.params.id);
    const { rate } = req.body;

    const index = talkers.findIndex((talker) => talker.id === id);
    talkers[index].talk.rate = rate;
    await writeDocument(talkers);
    return res.status(204).end();
  });

talkerRoute.use((error, _req, res, _next) => {
  res.status(500).json({ message: error.message });
});

module.exports = talkerRoute;