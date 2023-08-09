const { readDocument } = require('./readAndWriteDocument');

async function queryByName(query) {
  const talkers = await readDocument();

  if (query) {
    return talkers.filter((talker) =>
      talker.name.toLowerCase().includes(query.toLowerCase()));
  }
  return talkers;
}

function queryByRate(talkersArray, rate) {
  return talkersArray.filter((talker) => talker.talk.rate === Number(rate));
}

function queryByDate(talkersArray, date) {
  console.log(talkersArray);
  return talkersArray.filter((talker) => talker.talk.watchedAt === date);
}

module.exports = { queryByName, queryByRate, queryByDate };