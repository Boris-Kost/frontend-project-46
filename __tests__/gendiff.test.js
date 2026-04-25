import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import genDiff from '../src/index.js'
import parse from '../src/parsers.js'
import format from '../src/formatters/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

const expectedStylish = readFile('expected_nested.txt').trim()
const expectedPlain = readFile('expected_plain.txt').trim()

test('gendiff full integration', () => {
  expect(genDiff(getFixturePath('file1_nested.json'), getFixturePath('file2_nested.json'), 'stylish')).toBe(expectedStylish)
  expect(genDiff(getFixturePath('file1_nested.yml'), getFixturePath('file2_nested.yml'))).toBe(expectedStylish)
  expect(genDiff(getFixturePath('file1_nested.json'), getFixturePath('file2_nested.json'), 'plain')).toBe(expectedPlain)
  const jsonResult = genDiff(getFixturePath('file1_nested.json'), getFixturePath('file2_nested.json'), 'json')
  expect(() => JSON.parse(jsonResult)).not.toThrow()
})

test('parsers unit tests', () => {
  const data = '{"key": "value"}'
  expect(parse(data, 'json')).toEqual({ key: 'value' })
  const yamlData = 'key: value'
  expect(parse(yamlData, 'yml')).toEqual({ key: 'value' })
  expect(parse(yamlData, 'yaml')).toEqual({ key: 'value' })
  expect(() => parse(data, 'invalid')).toThrow("Unknown format: 'invalid'!")
})

test('formatters unit tests', () => {
  const tree = [{ key: 'follow', type: 'added', value: false }]
  expect(format(tree, 'stylish')).toContain('+ follow: false')
  expect(format(tree, 'plain')).toContain("Property 'follow' was added with value: false")
  expect(format(tree, 'json')).toContain('"type":"added"')
  expect(() => format(tree, 'invalid')).toThrow('Unknown format: invalid')
})

test('stylish stringify deep object', () => {
  const tree = [{
    key: 'group3',
    type: 'added',
    value: { fee: 100500, deep: { id: { number: 45 } } },
  }]
  const result = format(tree, 'stylish')
  expect(result).toContain('number: 45')
})

test('plain format complex values', () => {
  const tree = [
    { key: 'group3', type: 'added', value: { key: 'value' } },
    { key: 'group4', type: 'changed', oldValue: 'old', newValue: { key: 'value' } },
  ]
  const result = format(tree, 'plain')
  expect(result).toContain('with value: [complex value]')
  expect(result).toContain("updated. From 'old' to [complex value]")
})

test('gendiff nested stylish yaml fixtures', () => {
  expect(genDiff(getFixturePath('file1_nested.yaml'), getFixturePath('file2_nested.yaml'), 'stylish')).toBe(expectedStylish)
})
