# Установка зависимостей
install:
	npm install

# Установка линтера Airbnb
# lint-setup:
# npm init @eslint/config

# Установка линтера ESLint с конфигурацией Airbnb
lint-setup:
	npx install-peerdeps --dev eslint-config-airbnb-base@latest

# Проверка синтаксиса с использованием ESLint
lint:
	npx eslint .

# Запуск линтера ESLint с исправлением ошибок
lint-fix:
	npx eslint . --fix

# Запуск тестов (если они есть)
test:
	npm test

# Очистка node_modules и повторная установка зависимостей
reinstall:
	rm -rf node_modules
	npm install

# Запуск утилиты gendiff с передачей путей до двух файлов
gendiff:
	node gendiff.js file1.json file2.json

# Запуск утилиты gendiff с передачей путей до двух файлов и форматом вывода json
gendiff-json:
	node gendiff.js -f json file1.json file2.json

# Запуск утилиты gendiff с передачей путей до двух файлов и форматом вывода plain text
gendiff-plain:
	node gendiff.js -f plain file1.json file2.json

# Запуск утилиты gendiff с вызовом help
gendiff-help:
	./gendiff.js -h
