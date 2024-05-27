const fs = require('fs');
const path = require('path');

const parseFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const fileData = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(fileData);
};

module.exports = parseFile;
