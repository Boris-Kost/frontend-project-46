# Gendiff

Gendiff is a utility that finds the differences between two configuration files.

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Boris-Kost/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Boris-Kost/frontend-project-46/actions)
[![Node.js CI](https://github.com/Boris-Kost/frontend-project-46/actions/workflows/nodejs-ci.yml/badge.svg)](https://github.com/Boris-Kost/frontend-project-46/actions/workflows/nodejs-ci.yml)

## Installation

```bash
make install
```

## Usage

```bash
gendiff [options] <filepath1> <filepath2>
```

### Examples

**JSON:**
[![asciicast](https://asciinema.org/a/5kRlMPDIrL2Ph0aq9kCIb3P45.svg)](https://asciinema.org/a/5kRlMPDIrL2Ph0aq9kCIb3P45)

**YAML:**
```bash
gendiff file1.yml file2.yml
```

## Features
- Supports JSON, YAML (.yml, .yaml)
- Formats: stylish (default)
