#!/usr/bin/env sh
rm -rf .server
mkdir -p .server
tar -xvf .dist/standalone.tar.gz -C .server
