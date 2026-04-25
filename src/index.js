import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileData = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8');
const getExtension = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(getFileData(filepath1), getExtension(filepath1));
  const data2 = parse(getFileData(filepath2), getExtension(filepath2));

  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const diffLines = keys.map((key) => {
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${diffLines.join('\n')}\n}`;
};

export default genDiff;
