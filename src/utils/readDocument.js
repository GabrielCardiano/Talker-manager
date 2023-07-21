const fs = require('fs').promises;
const path = require('path');

const fileToRead = path.resolve(__dirname, '../talker.json');

async function readDocument() {
    const jsonTalkerData = await fs.readFile(fileToRead, 'utf-8');
    const jsTalkerData = JSON.parse(jsonTalkerData);
    return jsTalkerData;
}

module.exports = readDocument;