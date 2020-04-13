#!/usr/bin/env bash

set -e

deps=(
    "gh/lil-js/uuid@0.1.1/uuid.min.js"
    "gh/florian/xStore@2.0.4/src/xStore.min.js"
    "npm/confetti-js@0.0.18/dist/index.min.js"
    "npm/dayjs@1.8.21/dayjs.min.js"
    "npm/dayjs@1.8.21/plugin/relativeTime.js"
)

for i in "${deps[@]}"
do
    curl "https://cdn.jsdelivr.net/${i}" -L
    echo ";"
done
