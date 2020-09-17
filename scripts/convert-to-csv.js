const { dsvFormat, csvFormat } = require('d3-dsv')
const fs = require('fs')
const path = require('path')
const rawData = fs.readFileSync(path.join(__dirname, '../raw/geocoded.csv'), 'utf8')

const parser = dsvFormat(',')
const csv = parser.parse(rawData)

const places = csv.map((row, idx) => ({
  id: idx,
  name: row.Vorname + row.Nachname,
  place: row.Ort,
  lat: row.lat,
  lng: row.lng
}))

const formated = csvFormat(places)

fs.writeFileSync(path.join(__dirname, '../public/markers.csv'), formated, 'utf8')

console.log('done')
