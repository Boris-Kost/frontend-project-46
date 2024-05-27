#!/usr/bin/env node

const { program } = require('commander');
const genDiff = require('./src/genDiff');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    const format = options.format || 'default';
    const diff = genDiff(`files/${filepath1}`, `files/${filepath2}`);
    console.log(`Format: ${format}`);
    console.log(diff);
  })
  .helpOption('-h, --help', 'output usage information')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
