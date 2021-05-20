#!/usr/bin/env bash

# this script is meant to run once after having cloned the repository.
# because it is setup in `.scripts.prepare` in `package.json`, it will
# automatically run when doing an `npm install`.

# print every executed line and abort when one fails
set -ex

# skip when deploying to vercel (see https://vercel.com/docs/environment-variables#system-environment-variables)
[ -z "$CI" ] || exit 0

# avoid running the setup script multiple times
git log --oneline | grep -q 'Start new project with https://github.com/rbb-data/starter' && exit 0

# make sure to run from project root
cd $(dirname $0)/..

# copy resizer script into the public folder
cp node_modules/iframe-resizer/js/iframeResizer.contentWindow.js public

# substitute '{project-name}' with the current folder name
sed -i '' 's/{project-name}/'"$(basename $(pwd))"'/g' .env package.json

# clean up the git history
git commit --amend -m 'Start new project with https://github.com/rbb-data/starter/tree/'$(git rev-parse --short HEAD)
git remote remove origin
