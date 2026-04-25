import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import { execSync } from 'child_process'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

const expectedStylish = readFile('expected_nested.txt').trim()
const expectedPlain = readFile('expected_plain.txt').trim()

test('gendiff stylish format', () => {
  expect(genDiff(getFixturePath('file1_nested.json'), getFixturePath('file2_nested.json'), 'stylish')).toBe(expectedStylish)
  expect(genDiff(getFixturePath('file1_nested.yml'), getFixturePath('file2_nested.yml'))).toBe(expectedStylish)
  expect(genDiff(getFixturePath('file1_nested.yaml'), getFixturePath('file2_nested.yaml'))).toBe(expectedStylish)
})

test('gendiff plain format', () => {
  expect(genDiff(getFixturePath('file1_nested.json'), getFixturePath('file2_nested.json'), 'plain')).toBe(expectedPlain)
})

test('gendiff json format', () => {
  const result = genDiff(getFixturePath('file1_nested.json'), getFixturePath('file2_nested.json'), 'json')
  expect(() => JSON.parse(result)).not.toThrow()
})

test('gendiff error cases', () => {
  expect(() => genDiff(getFixturePath('file1_nested.json'), getFixturePath('file2_nested.json'), 'invalid')).toThrow()
  expect(() => genDiff(getFixturePath('unsupported.txt'), getFixturePath('unsupported.txt'))).toThrow()
})

test('gendiff complex nested object in stylish', () => {
  const result = genDiff(getFixturePath('file1_nested.json'), getFixturePath('file3_nested.json'), 'stylish')
  expect(result).toContain('innerKey: value')
})

test('gendiff complex nested object in plain', () => {
  const result = genDiff(getFixturePath('file1_nested.json'), getFixturePath('file3_nested.json'), 'plain')
  expect(result).toContain('was added with value: [complex value]')
})

test('gendiff CLI integration', () => {
  const binPath = path.join(__dirname, '..', 'bin', 'gendiff.js')
  const file1 = getFixturePath('file1_nested.json')
  const file2 = getFixturePath('file2_nested.json')
  const output = execSync(`node ${binPath} ${file1} ${file2}`).toString().trim()
  expect(output).toBe(expectedStylish)
})
