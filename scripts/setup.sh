#!/usr/bin/env bash

# this script is meant to run once after having cloned the repository.
# because it is setup in `.scripts.prepare` in `package.json`, it will
# automatically run when doing an `npm install`.

# print every executed line and abort when one fails
set -ex

# skip when deploying to vercel (see https://vercel.com/docs/environment-variables#system-environment-variables)
[ -z "$CI" ] || exit 0

# skip when the project was not templated
[ "$(git log --oneline | wc -l)" -eq 1 ] || exit 0

# avoid running the setup script multiple times
git log --oneline | grep -q 'Start new project with https://github.com/rbb-data/starter' && exit 0

# make sure to run from project root
cd $(dirname $0)/..

# copy resizer scripts to the public folder
cp node_modules/iframe-resizer/js/iframeResizer{.contentWindow,}.min.js public

# substitute '{project-name}' with the current folder name
sed -i '' 's/{project-name}/'"$(basename $(pwd))"'/g' .env package.json iframe-embed.html

# clean up the git history
git commit --amend -m 'Start new project with https://github.com/rbb-data/starter/tree/'$(git rev-parse --short HEAD)

# remove storybook-related stuff
rm .github/workflows/storybook.yml
[ "$(ls -A .github/workflows)" ] || rmdir .github/workflows
[ "$(ls -A .github)" ] || rmdir .github
rm -rf .storybook styleguide
find src -name '*.stories.*' -type f -delete
npm uninstall\
  @storybook/addon-a11y\
  @storybook/addon-actions\
  @storybook/addon-essentials\
  @storybook/addon-links\
  @storybook/node-logger\
  @storybook/preset-create-react-app\
  @storybook/react\
  @storybook/theming
node scripts/removeNpmScripts.js storybook build-storybook

# remove remote if it points to the template repository
git remote get-url origin | grep -q 'rbb-data/starter.git' && git remote remove origin
