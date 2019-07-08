#!/usr/bin/env bash

if [ "$HEROKU" != "true" ]; then
    exit 0
fi

echo "**************************"
echo "**  Build on Heroku...  **"
echo "**************************"

make compile
make migrate_prod
