const { dsvFormat, csvFormat } = require('d3-dsv')
const fs = require('fs')
const path = require('path')
var rp = require('request-promise')
const rawData = fs.readFileSync(path.join(__dirname, '../raw/raw_source_file.csv'), 'utf8')

function timeout (delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, delay)
  })
}

const parser = dsvFormat(',')
const csv = parser.parse(rawData)

const ADDRESS_KEY = 'Ort'

// csv.length = 2
const geocoded = csv.map(async (row, i) => {
  const options = {
    uri: 'https://api.openrouteservice.org/geocode/search',
    qs: {
      api_key: process.env.REACT_APP_OPENROUTSERVICE_KEY,
      'boundary.country': 'DE',
      'layers': 'localadmin,venue,locality'
    },
    headers: {
      'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
    },
    json: true // Automatically parses the JSON string in the response
  }

  try {
    const request = {
      ...options,
      qs: { ...options.qs, text: row[ADDRESS_KEY] }
    }

    // try not to hit the api limit
    await timeout(i * 2000)

    if (row[ADDRESS_KEY] === '') throw new Error(`Ort nicht angegeben: ${i}`)

    const addressRes = await rp(request)

    if (!addressRes.features[0]) throw new Error(`Ort ${row[ADDRESS_KEY]} nicht gefunden`)

    console.log(i, row[ADDRESS_KEY])

    return {
      ...row,
      lat: addressRes.features[0].geometry.coordinates[1],
      lng: addressRes.features[0].geometry.coordinates[0]
    }
  } catch (e) {
    console.error(e.message)
    return {
      ...row,
      lat: null,
      lng: null
    }
  }
})

Promise.all(geocoded)
  .then(resolvedGeocoded => {
    const formated = csvFormat(resolvedGeocoded)

    fs.writeFileSync(path.join(__dirname, '../raw/geocoded.csv'), formated, 'utf8')
    console.log('done')
  })
