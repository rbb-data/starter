import { MapLayer, withLeaflet } from 'react-leaflet'
import PropTypes from 'prop-types'
import Chroma from 'chroma-js'
import L from 'leaflet'
import { featureToLatLng } from 'lib/geoJsonCompat'
import { red } from 'global_styles/colors.sass'
import _ from './MapGeoJsonCluster.module.sass'

import 'leaflet.markercluster'

const scale = Chroma.scale([red, 'black']).domain([2, 150])

function getSize(childCount) {
  const radius = childCount * 0.5
  if (radius < 8) return 8
  if (radius > 48) return 48

  return radius
}

function iconCreateFunction(cluster) {
  const childCount = cluster.getChildCount()
  const size = getSize(childCount)

  return L.divIcon({
    html: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        r="${getSize(childCount)}"
        fill="${scale(childCount)}"
        fill-opacity="${1}"
        stroke-width="0" />
        <text x="50" y="50" text-anchor="middle" dx="-0.03em" dy=".38em" class="${
          _.circleText
        }">
          ${size > 40 ? childCount : ''}
        </text>
    </svg>`,
    iconSize: [20, 20],
    className: _.divIcon,
  })
}

function markerCreateFunction(feature) {
  return L.circleMarker(featureToLatLng(feature), {
    radius: 1,
    stroke: false,
    interactive: false,
    fillColor: 'red',
    fillOpacity: 1,
  })
}

/**
 * Clusters geojson features using [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) and draws them on a map.
 *
 * You can pass it Everything you can pass to
 * [`L.markerClusterGroup`](https://github.com/Leaflet/Leaflet.markercluster).
 *
 * This component needs to be a child or some grandchild of
 * [`<Map>`](https://react-leaflet.js.org/docs/en/components.html#map)
 */
class MapGeoJsonCluster extends MapLayer {
  createLeafletElement({
    features,
    markerCreateFunction,
    iconCreateFunction,
    leaflet,
    ...options
  }) {
    const group = L.markerClusterGroup({ iconCreateFunction, ...options })
    const markers = features.map(markerCreateFunction)
    group.addLayers(markers)

    return group
  }

  updateLeafletElement(fromProps, toProps) {
    const { features, markerCreateFunction } = toProps

    this.leafletElement.clearLayers()

    const markers = features.map(markerCreateFunction)
    this.leafletElement.addLayers(markers)
  }
}

MapGeoJsonCluster.propTypes = {
  /** An array of geojson features */
  features: PropTypes.array.isRequired,
  /** a function that get's the feature as an argument and should return a leaflet marker */
  markerCreateFunction: PropTypes.func,
  /** a function that get's the cluster as an argument and should return a leaflet icon */
  iconCreateFunction: PropTypes.func,
}

MapGeoJsonCluster.defaultProps = {
  iconCreateFunction: iconCreateFunction,
  markerCreateFunction: markerCreateFunction,
}

export default withLeaflet(MapGeoJsonCluster)
