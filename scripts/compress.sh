#!/usr/bin/env sh
mkdir -p .dist
tar -cvf - -C .next/standalone . | gzip -9 - > .dist/standalone.tar.gz
