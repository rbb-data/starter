import {toLatLng} from 'leaflet/src/geo/LatLng'

/**
 * Transforms a GeoJSON Feature with point geometry to a Leaflet.LatLng
 * representing the same point.
 *
 * @param  {GeoJSON.Point} feature
 * @return {Leaflet.LatLng}
 */
export function featureToLatLng (feature) {
  const coords = feature.geometry.coordinates
  return toLatLng([coords[1], coords[0]])
}

/**
 * Transforms a Leaflet.LatLng to a GeoJSON Feature with a point
 *
 * @param   {Leaflet.LatLng}
 * @return  {GeoJSON.Point}
 */
export function latLngToFeature (latLng) {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [latLng.lng, latLng.lat]
    }
  }
}
