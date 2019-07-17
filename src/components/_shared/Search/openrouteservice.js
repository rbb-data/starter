/* eslint-env browser */
const TOKEN = '58d904a497c67e00015b45fc8129a6e7cd6d44aca2c1c45b56810512'

/**
 * @param  {Object} params An object of parameter-value pairs
 * @return {String}        A query string (without the preceding question mark)
 */
function toUriString (params) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')
}

function throwIfError (res) {
  return res.json()
    .then(body => {
      if (body.status_code > 399) {
        throw new Error(`${body.status_code} ${body.status} - ${body.error} (Error Code: ${body.error_code})`)
      }
      return body
    })
    .catch(err => console.error(err))
}

// fix taken from https://docs.rbb-online.de/bitbucket/projects/RD/repos/datateam/browse/investitionen/js/l.geosearch.provider.openstreetmap.js
export function fixBerlinSearchResult (feature) {
  let borough = feature.properties.borough
  let neighbourhood = feature.properties.neighbourhood

  if (feature.properties.region === 'Berlin') {
    // TODO temporary fix
    // check if https://github.com/pelias/pelias/issues/536 is fixed
    // or use another search API http://wiki.openstreetmap.org/wiki/Search_engines
    switch (feature.properties.borough) {
      case 'Tempelhof-Schoneberg':
        borough = 'Tempelhof-Schöneberg'
        break
      case 'Treptow-Kopenick':
        borough = 'Treptow-Köpenick'
        break
      case 'Neukolln':
        borough = 'Neukölln'
        break
      default: break
    }

    switch (feature.properties.neighbourhood) {
      case 'Franzosisch Buchholz':
        neighbourhood = 'Französisch Buchholz'
        break
      case 'Niederschonhausen':
        neighbourhood = 'Niederschönhausen'
        break
      case 'Schoneberg':
        neighbourhood = 'Schöneberg'
        break
      case 'Neukolln':
        neighbourhood = 'Neukölln'
        break
      case 'Planterwald':
        neighbourhood = 'Plänterwald'
        break
      case 'Niederschoneweide':
        neighbourhood = 'Niederschöneweide'
        break
      case 'Oberschoneweide':
        neighbourhood = 'Oberschöneweide'
        break
      case 'Kopenick':
        neighbourhood = 'Köpenick'
        break
      case 'Grunau':
        neighbourhood = 'Grünau'
        break
      case 'Muggelheim':
        neighbourhood = 'Müggelheim'
        break
      case 'Schmockwitz':
        neighbourhood = 'Schmöckwitz'
        break
      case 'Lubars':
        neighbourhood = 'Lübars'
        break
      case 'Markisches Viertel':
        neighbourhood = 'Märkisches Viertel'
        break
      case 'Neu-Hohenschonhausen':
        neighbourhood = 'Neu-Hohenschönhausen'
        break
      default: break
    }
  }

  return {
    ...feature,
    properties: {
      ...feature.properties,
      borough: borough,
      neighbourhood: neighbourhood
    }
  }
}

/**
 * Fetches autocomplete suggestions for a string of text.
 *
 * @param  {String} text                      Text to base the suggestions on
 * @param  {String} location='berlin'         berlin or brandenburg the bounding box for the search
 * @param  {String} [layers='locality']       Which layers to search for in autosuggestions; see https://openrouteservice.org/dev/#/api-docs/geocode/autocomplete/get
 * @param  {String} sources='osm'             Also refer to https://openrouteservice.org/dev/#/api-docs/geocode/autocomplete/get
 * @return {Promise}                          A promise that resolves to a list of suggestions, like [{name, latLon}] in descending order of precedence
 */
export function autocomplete ({ text, layers = 'street', sources = 'osm', location = 'berlin' }) {
  const brandenburgBounds = {
    'boundary.rect.min_lat': 50.659064,
    'boundary.rect.min_lon': 11.067355,
    'boundary.rect.max_lat': 54.8590907,
    'boundary.rect.max_lon': 15.2658159
  }
  const berlinBounds = {
    'boundary.rect.min_lat': 52.3351292878,
    'boundary.rect.min_lon': 13.0840301514,
    'boundary.rect.max_lat': 52.6784636529,
    'boundary.rect.max_lon': 13.7775421143
  }
  let bounds = ''
  let q = text

  if (location === 'berlin') {
    bounds = berlinBounds
    q = text.indexOf('Berlin') === -1 ? text + ', Berlin' : text
  }

  if (location === 'brandenburg') {
    bounds = brandenburgBounds
    q = text.indexOf('Brandenburg') === -1 ? text + ', Brandenburg' : text
  }

  // bounding box and centroid of Berlin
  const params = {
    text: q,
    sources,
    api_key: TOKEN,
    layers,
    'focus.point.lat': 52.5161593,
    'focus.point.lon': 13.3827185,
    ...bounds,
    'boundary.country': 'DEU'
  }

  const uri = `//api.openrouteservice.org/geocode/autocomplete?${toUriString(params)}`

  return fetch(uri)
    .then(throwIfError)
    .then(body => ({
      type: 'FeatureCollection',
      features: body.features
    }))
}

/**
 * Takes one feature and an array of other features to compute a distance to.
 *
 * @param  {GeoJSON.Feature} feature
 * @param  {GeoJSON.Feature[]} otherFeatures
 * @param  {String} costing
 * @return {Promise}
export function fetchTimeDistanceMatrix ({ feature, otherFeatures, costing = 'auto' }) {
  // convert from geojson to the format expected by mapzen:
  const locations = [{lat: feature.geometry.coordinates[1], lon: feature.geometry.coordinates[0]}]
    .concat(otherFeatures.map(f =>
      ({ lat: f.geometry.coordinates[1], lon: f.geometry.coordinates[0] })
    ))
  const uri = `//matrix.mapzen.com/one_to_many?` +
    `api_key=${MAPZEN_API_KEY}` +
    `&json=${JSON.stringify({ costing, locations })}`
  return fetch(uri)
    .then(throwIfError)
}
/**
 * Fetches isochrones for a feature.
 *
 * @param  {GeoJSON.Feature} feature    GeoJSON feature with point geometry
 * @param  {String} [costing='auto' }]  Costing model to use
 * @return {Promise}
export function fetchIsochrones ({ feature, costing = 'auto', contours = [{time: 15}, {time: 30}, {time: 45}, {time: 60}] }) {
  const params = {
    costing,
    contours,
    locations: [{lat: feature.geometry.coordinates[1], lon: feature.geometry.coordinates[0]}],
    denoise: 0.9,
    generalize: 50,
    polygons: false
  }
  const uri = '//matrix.mapzen.com/isochrone?' +
    `api_key=${MAPZEN_API_KEY}` +
    `&json=${JSON.stringify(params)}`
  return fetch(uri)
    .then(throwIfError)
}
*/
