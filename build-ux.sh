#!/usr/bin/env bash

cd ux
tsc
cd ..
rm -rf dist/ux
mkdir dist/ux
cp -r ux/css dist/ux/css
cp -r ux/images dist/ux/images
cp -r ux/js dist/ux/js
cp ux/*.html dist/ux/

# rm -rf dist/ux-admin
# mkdir dist/ux-admin
# cp -r ux-admin/css dist/ux-admin/css
# cp -r ux-admin/images dist/ux-admin/images
# cp -r ux-admin/js dist/ux-admin/js
# cp ux-admin/*.html dist/ux-admin/

