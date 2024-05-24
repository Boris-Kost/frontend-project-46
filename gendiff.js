#!/usr/bin/env node

const { program } = require('commander');
const parseFile = require('./fileParser');

const compareFiles = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  // Логика для сравнения данных
  if (JSON.stringify(data1) === JSON.stringify(data2)) {
    return 'Files are identical';
  }
  return 'Files are different';
};

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    const format = options.format || 'default';
    const result = compareFiles(filepath1, filepath2);
    console.log(`Format: ${format}`);
    console.log(result);
  })
  .helpOption('-h, --help', 'output usage information')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
