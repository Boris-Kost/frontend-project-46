import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileData = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8');
const getExtension = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(getFileData(filepath1), getExtension(filepath1));
  const data2 = parse(getFileData(filepath2), getExtension(filepath2));

  const tree = buildTree(data1, data2);
  return format(tree, formatName);
};

export default genDiff;
