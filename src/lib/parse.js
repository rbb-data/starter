import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { csvParse } from 'd3-dsv';

const filePath = (filename) => path.join(process.cwd(), filename);

export const parseJSON = (filename) =>
  JSON.parse(fs.readFileSync(filePath(filename)));

export const parseYAML = (filename) =>
  yaml.safeLoad(fs.readFileSync(filePath(filename)));

export const parseCSV = async (filename, row) =>
  csvParse(fs.readFileSync(filePath(filename), 'utf8'), row);
