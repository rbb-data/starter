import React from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-leaflet'
import { LatLng, DivIcon } from 'leaflet'
import colors from '../../styles/colors.sass'

/**
 * Renders a locator at a given location.
 *
 * This component needs to be a child or some grandchild of
 * [`<Map>`](https://react-leaflet.js.org/docs/en/components.html#map)
 */
const MapLocationMarker = ({ position, pane }) => {
  if (!position) return null

  const iconHtml = `<svg viewBox='0 0 13 17' version='1.1' xmlns='http://www.w3.org/2000/svg'>
    <g id='Artboard-Copy' transform='translate(-599.000000, -303.000000)' stroke=${colors.darkGrey} strokeWidth='2'>
      <path d='M605.79257,316.961064 L606.691853,314.890485 L607.130272,314.754643 C609.41294,314.047368 611,311.927529 611,309.5 C611,306.462434 608.537566,304 605.5,304 C602.462434,304 600,306.462434 600,309.5 C600,312.137293 601.870627,314.389739 604.425277,314.895244 L604.939551,314.997006 L605.79257,316.961064 Z M605.5,315 C602.462434,315 600,312.537566 600,309.5 C600,306.462434 602.462434,304 605.5,304 C608.537566,304 611,306.462434 611,309.5 C611,312.537566 608.537566,315 605.5,315 Z' />
    </g>
  </svg>`

  const icon = new DivIcon({
    html: iconHtml,
    className: false,
    iconSize: [26, 34],
    iconAnchor: [13, 34]
  })

  const markerProps = {
    position: position,
    icon: icon,
    pane: pane,
    className: false,
    interactive: false
  }

  return <Marker {...markerProps} />
}

MapLocationMarker.propTypes = {
  /** The name of the pane the marker should be rendered on. */
  pane: PropTypes.string,
  /** see: https://leafletjs.com/reference-1.3.4.html#latlng */
  position: PropTypes.instanceOf(LatLng).isRequired
}

MapLocationMarker.defaultProps = {
  pane: 'markerPane'
}

export default MapLocationMarker
