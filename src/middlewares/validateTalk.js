function validateTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
}

function validatewatchedAt(req, res, next) {
  const { talk: { watchedAt } } = req.body;

  const validFormat = /^(0[1-9]|[1-2]\d|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
  const validDate = validFormat.test(watchedAt);

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!validDate) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
}

function validateRate(req, res, next) {
  const { talk: { rate } } = req.body;

  const invalidRate = rate < 1 || rate > 5 || !Number.isInteger(rate);

  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (invalidRate) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  next();
}

function validateRateForPatch(req, res, next) {
  const { rate } = req.body;

  const invalidRate = rate < 1 || rate > 5 || !Number.isInteger(rate);

  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (invalidRate) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
}

function validateQueryByRate(req, res, next) {
  const { rate } = req.query;
  if (rate === undefined
    || (Number(rate) >= 1 && Number(rate) <= 5 && Number.isInteger(Number(rate)))) {
    return next();
  }

  return res.status(400).json({
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
  });
}

function validateQueryByDate(req, res, next) {
  const { date } = req.query;

  const validFormat = /^(0[1-9]|[1-2]\d|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
  const validDate = validFormat.test(date);

  if (!date || validDate) {
    return next();
  }
  return res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
}

module.exports = {
  validateTalk,
  validatewatchedAt,
  validateRate,
  validateRateForPatch,
  validateQueryByRate,
  validateQueryByDate,
};