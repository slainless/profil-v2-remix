#!/usr/bin/env sh
export $(grep -v '^#' ${1:-".env.local"} | xargs -d '\n')
HOSTNAME=0.0.0.0 node .next/standalone/server.js
