.PHONY: test migrate dev clean watch test lint test_ts test test_compiled
.PHONY: lint_fix init watch_test verify deploy build migrate_prod

BIN=node_modules/.bin
COMPILE=build/compile

default: $(COMPILE)

node_modules: package.json yarn.lock
	yarn

migrate: node_modules
	$(BIN)/db-migrate up

migrate_down: node_modules
	$(BIN)/db-migrate down

init: node_modules migrate .env

.env:
	cp -n .env.example .env || :

clean:
	rm -rf logs node_modules build

$(COMPILE): src config node_modules
	$(BIN)/tsc -p . --outDir ./$(COMPILE)

watch: $(COMPILE)
	$(BIN)/tsc -p . --outDir ./$(COMPILE) --watch --pretty & \
	$(BIN)/nodemon server.js

test_ts: node_modules
	$(BIN)/jest --verbose && mv test-report.xml logs/jest

test: test_ts test_compiled

verify: lint test

test_compiled: $(COMPILE) node_modules
	$(BIN)/jest --config jest.config.compiled.js

lint: node_modules
	$(BIN)/tslint -c tslint.json -p .

lint_fix: node_modules
	$(BIN)/tslint -c tslint.json --fix -p .

dev: lint_fix verify

watch_test: node_modules
	$(BIN)/jest --config jest.config.dev.js --watch

build:
	$(BIN)/tsc -p . --outDir ./$(COMPILE)

migrate_prod:
	$(BIN)/db-migrate --config db-config.js --env prod up

deploy:
	./deploy.sh
