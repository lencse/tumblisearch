.PHONY: test migrate dev clean watch test lint test_ts test test_compiled
.PHONY: lint_fix init watch_test verify deploy migrate_prod compile

VENDOR=node_modules
BIN=$(VENDOR)/.bin
COMPILE=build/compile

default: $(COMPILE)

$(VENDOR): package.json yarn.lock
	yarn && touch $(VENDOR)

migrate: $(VENDOR)
	$(BIN)/db-migrate up

migrate_down: $(VENDOR)
	$(BIN)/db-migrate down

init: .env $(VENDOR) migrate

.env:
	cp -n .env.example .env || :

clean:
	rm -rf logs $(VENDOR) build

$(COMPILE): src config $(VENDOR)
	make compile && touch $(COMPILE)

watch: $(COMPILE)
	$(BIN)/tsc -p . --outDir ./$(COMPILE) --watch --pretty & \
	$(BIN)/nodemon server.js & \
	$(BIN)/nodemon queue.js

test_ts: $(VENDOR)
	$(BIN)/jest --verbose && mv test-report.xml logs/jest

test: test_ts test_compiled

verify: lint test

test_compiled: $(COMPILE) $(VENDOR)
	$(BIN)/jest --config jest.config.compiled.js

lint: $(VENDOR)
	$(BIN)/tslint -c tslint.json -p .

lint_fix: $(VENDOR)
	$(BIN)/tslint -c tslint.json --fix -p .

dev: lint_fix verify

watch_test: $(VENDOR)
	$(BIN)/jest --config jest.config.dev.js --watch

compile:
	$(BIN)/tsc -p . --outDir ./$(COMPILE)

migrate_prod:
	$(BIN)/db-migrate --config db-config.js --env prod up

deploy:
	./deploy.sh
