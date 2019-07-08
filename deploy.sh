#!/usr/bin/env bash

if [ "$HEROKU" != "true" ] || [ "$DEPLOY_STARTED" = "true" ]; then
    exit 0
fi

echo "**************************"
echo "**  Build on Heroku...  **"
echo "**************************"

export DEPLOY_STARTED="true"

make build
make migrate_prod
