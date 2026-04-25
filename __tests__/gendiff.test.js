import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

const expectedStylish = readFile('expected_nested.txt').trim()
const expectedPlain = readFile('expected_plain.txt').trim()

test('gendiff nested stylish json', () => {
  expect(genDiff(getFixturePath('file1_nested.json'), getFixturePath('file2_nested.json'))).toBe(expectedStylish)
})

test('gendiff nested stylish yml', () => {
  expect(genDiff(getFixturePath('file1_nested.yml'), getFixturePath('file2_nested.yml'), 'stylish')).toBe(expectedStylish)
})

test('gendiff nested stylish yaml', () => {
  expect(genDiff(getFixturePath('file1_nested.yaml'), getFixturePath('file2_nested.yaml'), 'stylish')).toBe(expectedStylish)
})

test('gendiff plain', () => {
  expect(genDiff(getFixturePath('file1_nested.json'), getFixturePath('file2_nested.json'), 'plain')).toBe(expectedPlain)
})

test('gendiff json format', () => {
  const result = genDiff(getFixturePath('file1_nested.json'), getFixturePath('file2_nested.json'), 'json')
  expect(() => JSON.parse(result)).not.toThrow()
  const parsed = JSON.parse(result)
  expect(Array.isArray(parsed)).toBe(true)
})

test('gendiff default format is stylish', () => {
  expect(genDiff(getFixturePath('file1_nested.json'), getFixturePath('file2_nested.json'))).toBe(expectedStylish)
})

test('gendiff unknown format', () => {
  expect(() => genDiff(getFixturePath('file1_nested.json'), getFixturePath('file2_nested.json'), 'unknown')).toThrow('Unknown format: unknown')
})
