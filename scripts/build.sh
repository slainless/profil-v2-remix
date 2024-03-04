#!/usr/bin/env sh
${1:-yarn} build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
