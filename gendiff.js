#!/usr/bin/env node

const { program } = require('commander');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')  // Настраиваем опцию помощи
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
