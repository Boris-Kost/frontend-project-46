# Gendiff

Gendiff is a utility that finds the differences between two configuration files. It supports JSON and YAML formats and can output results in various styles: stylish, plain, and JSON.

### Project Status:
[![Actions Status](https://github.com/Boris-Kost/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Boris-Kost/frontend-project-46/actions)
[![Node.js CI](https://github.com/Boris-Kost/frontend-project-46/actions/workflows/nodejs-ci.yml/badge.svg)](https://github.com/Boris-Kost/frontend-project-46/actions/workflows/nodejs-ci.yml)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Boris-Kost_frontend-project-46&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=Boris-Kost_frontend-project-46)
[![Test Coverage](https://sonarcloud.io/api/project_badges/measure?project=Boris-Kost_frontend-project-46&metric=coverage)](https://sonarcloud.io/dashboard?id=Boris-Kost_frontend-project-46)

## Installation

```bash
make install
```

## Usage

```bash
gendiff [options] <filepath1> <filepath2>
```

### Options
- `-V, --version`: output the version number
- `-f, --format [type]`: output format (stylish, plain, json) (default: "stylish")
- `-h, --help`: display help for command

## Demos

### Step 5: Flat JSON comparison
[![asciicast](https://asciinema.org/a/L6WsmljuNaWyxcw1.svg)](https://asciinema.org/a/L6WsmljuNaWyxcw1)

### Step 6: YAML support
[![asciicast](https://asciinema.org/a/jI6dtaUxUoyySvl0.svg)](https://asciinema.org/a/jI6dtaUxUoyySvl0)

### Step 7: Recursive comparison (Stylish format)
[![asciicast](https://asciinema.org/a/7FVqsvmdHYHXfBAC.svg)](https://asciinema.org/a/7FVqsvmdHYHXfBAC)

### Step 8: Plain format
[![asciicast](https://asciinema.org/a/EOVaS3ZfzCkuZSik.svg)](https://asciinema.org/a/EOVaS3ZfzCkuZSik)

### Step 9: JSON format
[![asciicast](https://asciinema.org/a/ci62GHFo76r6LaO7.svg)](https://asciinema.org/a/ci62GHFo76r6LaO7)

## Features
- Supports JSON, YAML (.yml, .yaml)
- Recursive comparison of nested structures
- Multiple output formats: stylish, plain, json
- ES6+ implementation
- Comprehensive test coverage with Jest
