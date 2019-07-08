#!/usr/bin/env bash

if [ "$HEROKU" != "true" ] || [ "$DEPLOY_STARTED" = "true" ]; then
    exit 0
fi

echo "**************************"
echo "**  Build on Heroku...  **"
echo "**************************"

export DEPLOY_STARTED="true"

node_modules/.bin/tsc -p . --outDir ./build/compile
node_mosule/.bin/db-migrate --config db-config.js --env prod up
