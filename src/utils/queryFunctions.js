function queryByName(talkersArray, queryName) {
    return talkersArray.filter((talker) =>
        talker.name.toLowerCase().includes(queryName.toLowerCase()));
}

function queryByRate(talkersArray, rate) {
    return talkersArray.filter((talker) => talker.talk.rate === Number(rate));
}

function queryByNameAndRate(talkersArray, req) {
    const { q, rate } = req.query;
    const filterByRate = queryByRate(talkersArray, rate);
    const filterByName = queryByName(filterByRate, q);
    return filterByName;
}

module.exports = { queryByName, queryByRate, queryByNameAndRate };