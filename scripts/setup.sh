#!/usr/bin/env bash

# this script is meant to run once after having cloned the repository
# make sure to run from project root
cd $(dirname $0)/..

# substitute '{project-name}' with the current folder name
sed -i 's/{project-name}/'"$(basename $(pwd))"'/g' .env package.json

# clean up the git history
git commit --amend -m 'Start new project with https://github.com/rbb-data/starter/tree/'$(git rev-parse --short HEAD)
git remote remove origin
