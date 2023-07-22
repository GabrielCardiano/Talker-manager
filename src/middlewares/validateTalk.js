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

module.exports = {
  validateTalk,
  validatewatchedAt,
  validateRate,
};