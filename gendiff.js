#!/usr/bin/env node

const { program } = require('commander');
const genDiff = require('./diffGenerator'); // Импортируем из diffGenerator.js

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2);
    console.log(result);
  })
  .helpOption('-h, --help', 'output usage information')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
