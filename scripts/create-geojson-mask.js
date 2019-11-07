const fs = require('fs')
const path = require('path')
const turf = require('@turf/turf')
const args = process.argv.slice(2)

// Display a help message when appropriate
const help = `Helper utility to create masks from GeoJSON files. Creates a large rectangular polygon and subtracts the given GeoJSON geometries. The result will be written to stdout

Usage: create-geojson-mask [geojson-path] > result.geojson

  -h, --help  Displays this help message
`

if (args.length === 0 || args[0] === '-h' || args[0] === '--help') {
  console.log(help)
  process.exit(0)
}

// merge the input file into one polygon and invert it
const input = JSON.parse(fs.readFileSync(path.resolve(args[0])))
const unaryUnion = turf.union(...input.features)
process.stdout.write(JSON.stringify(turf.mask(unaryUnion)))