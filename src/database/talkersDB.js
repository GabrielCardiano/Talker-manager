const connection = require('./connection');

async function findAll() {
  const [result] = await connection.execute('SELECT * FROM talkers');

  return result.map((talker) => ({
    id: talker.id,
    name: talker.name,
    age: talker.age,
    talk: {
      rate: talker.talk_rate,
      watchedAt: talker.talk_watched_at,
    }
  }));
}

module.exports = findAll;
