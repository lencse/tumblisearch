#!/usr/bin/env bash

if [ "$HEROKU" != "true" ] || [ "$DEPLOY_STARTED" = "true" ]; then
    exit 0
fi

echo "Build on Heroku"
export DEPLOY_STARTED="true"

make
db-migrate --config db-config.js --env prod up
