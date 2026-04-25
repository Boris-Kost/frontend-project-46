import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expected_nested.txt').trim();

test('gendiff nested stylish json', () => {
  expect(genDiff(getFixturePath('file1_nested.json'), getFixturePath('file2_nested.json'))).toBe(expectedStylish);
});

test('gendiff nested stylish yml', () => {
  expect(genDiff(getFixturePath('file1_nested.yml'), getFixturePath('file2_nested.yml'))).toBe(expectedStylish);
});
