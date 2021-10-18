#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

// read original package data
const PACKAGE_PATH = path.join(__dirname, '../package.json');
const pkgData = JSON.parse(fs.readFileSync(PACKAGE_PATH));

// read script names from the command line
const scriptsToRemove = process.argv.slice(2);

// remove given scripts
scriptsToRemove.forEach((script) => {
  delete pkgData.scripts[script];
});

// write to file
fs.writeFileSync(PACKAGE_PATH, JSON.stringify(pkgData, null, 2));
