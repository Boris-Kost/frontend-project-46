#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');

// Функция для чтения файлов и их сравнения
const compareFiles = (filepath1, filepath2, format) => {
  const fullPath1 = path.resolve(filepath1);
  const fullPath2 = path.resolve(filepath2);
  const data1 = fs.readFileSync(fullPath1, 'utf-8');
  const data2 = fs.readFileSync(fullPath2, 'utf-8');

  // Здесь может быть логика для сравнения данных
  if (data1 === data2) {
    return 'Files are identical';
  }
  return 'Files are different';
};

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>') // Указываем аргументы командной строки
  .option('-f, --format [type]', 'output format') // Добавляем опцию для формата вывода
  .action((filepath1, filepath2, options) => {
    const format = options.format || 'default';
    const result = compareFiles(filepath1, filepath2, format);
    console.log(result);
  })
  .helpOption('-h, --help', 'output usage information')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
