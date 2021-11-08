#!/usr/bin/env bash

cd ux
tsc
cd ..
mkdir dist/ux
cp -r ux/css dist/ux/css
cp -r ux/images dist/ux/images
cp -r ux/js dist/ux/js
cp ux/*.html dist/ux/