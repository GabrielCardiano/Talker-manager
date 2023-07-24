const fs = require('fs').promises;
const { writeFile } = require('fs/promises');
const path = require('path');

const pathFile = path.resolve(__dirname, '../talker.json');

async function readDocument() {
    const jsonTalkerData = await fs.readFile(pathFile, 'utf-8');
    const jsTalkerData = JSON.parse(jsonTalkerData);
    return jsTalkerData;
}

async function writeDocument(file) {
    await writeFile(pathFile, JSON.stringify(file));
}

module.exports = { readDocument, writeDocument };