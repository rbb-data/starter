const { dsvFormat } = require('d3-dsv')
const fs = require('fs')
const path = require('path')
const rawData = fs.readFileSync(path.join(__dirname, '../raw/geocoded.csv'), 'utf8')

const parser = dsvFormat(',')
const csv = parser.parse(rawData)

const features = csv
  .map((row, idx) => {
    // usually lat lng are supplied with `,` instead of `,` as decimal seperator <- fix this
    // also reducing the resolution with `toFixed` can save a lot of file size
    const lat = parseFloat(row.lat.replace(',', '.')).toFixed(3)
    const lng = parseFloat(row.lng.replace(',', '.')).toFixed(3)

    return {
      type: 'Feature',
      properties: {
        id: '' + idx,
        name: row.Vorname + row.Nachname,
        place: row.Ort
      },
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      }
    }
  })

const geojson = {
  type: 'FeatureCollection',
  features: features
}

const formated = JSON.stringify(geojson)

fs.writeFileSync(path.join(__dirname, '../public/markers.geojson'), formated, 'utf8')

console.log('done')
