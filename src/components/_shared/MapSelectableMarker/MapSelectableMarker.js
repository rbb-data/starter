import React from 'react'
import PropTypes from 'prop-types'
import L, { DivIcon } from 'leaflet'
import { Marker } from 'react-leaflet'
import colors from 'global_styles/colors.sass'
import _ from './styles.sass'

/**
 * Renders a marker at a given location.
 *
 * You can pass it Everything you can pass to
 * [`Marker`](https://leafletjs.com/reference-1.3.4.html#marker) except `icon`.
 *
 * This component needs to be a child or some grandchild of
 * [`<Map>`](https://react-leaflet.js.org/docs/en/components.html#map)
 */
const MapSelectableMarker = props => {
  const {
    key,
    isSelected,
    optimizeForTouch,
    fillColor,
    strokeColor,
    hasStroke,
    ...rest
  } = props

  const normalIconSize = optimizeForTouch ? [40, 40] : [12, 16]
  const normalIconAnchor = optimizeForTouch ? [20, 30] : [6, 16]

  const selectedIconSize = [22, 30]
  const selectedIconAnchor = [11, 27]

  const iconHtml = isSelected
    ? `<svg width='22px' height='30' viewBox='-20 0 465 488' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <path fill=${fillColor} stroke=${hasStroke && strokeColor} stroke-width='30px' d='M149.543021,415.519059 C62.9202299,388.686959 0,307.941383 0,212.5 C0,95.1394907 95.1394907,0 212.5,0 C329.860509,0 425,95.1394907 425,212.5 C425,308.380289 361.499738,389.429297 274.260425,415.885813 C273.694237,416.181792 273.125662,416.473828 272.554736,416.761886 C265.701069,420.219867 251.736318,423.74013 245.496319,438.201165 L212.294922,497.144531 C212.254994,497.049158 201.157914,477.401369 179.003681,438.201165 C172.763682,423.74013 158.798931,420.219867 151.945264,416.761886 C151.139807,416.355497 150.339029,415.941189 149.543032,415.519063 L149.543021,415.519059 Z' />
    </svg>`
    : `<svg width='12px' height='16px' viewBox='-10 0 288 352' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <path fill=${fillColor} stroke=${hasStroke && strokeColor} stroke-width='25px' d='M101.003681,274.201165 C94.763682,259.74013 80.7989308,256.219867 73.9452637,252.761886 C30.3788436,230.78068 0.5,185.629629 0.5,133.5 C0.5,59.7699859 60.2699859,0 134,0 C208.230014,0 268,59.7699859 268,133.5 C268,185.629629 238.121156,230.78068 194.554736,252.761886 C187.701069,256.219867 173.736318,259.74013 167.496319,274.201165 L134.294922,351.144531 C134.254994,351.049158 123.157914,325.401369 101.003681,274.201165 Z' />
    </svg>`

  const icon = new DivIcon({
    html: iconHtml,
    className: `${_.marker} ${!isSelected && optimizeForTouch && _.betterTouch}`,
    iconSize: isSelected ? selectedIconSize : normalIconSize,
    iconAnchor: isSelected ? selectedIconAnchor : normalIconAnchor
  })

  const markerProps = {
    ...rest,
    icon: icon,
    key: '' + key + isSelected + optimizeForTouch
  }

  return <Marker {...markerProps} />
}

MapSelectableMarker.propTypes = {
  key: PropTypes.string.isRequired,
  /** see: https://leafletjs.com/reference-1.3.4.html#latlng */
  position: PropTypes.instanceOf(L.LatLng).isRequired,
  /** changes the size and style of the marker */
  isSelected: PropTypes.bool,
  /** draws a bigger invisible touch area around the marker */
  optimizeForTouch: PropTypes.bool,
  fillColor: PropTypes.string,
  /** outline color   */
  strokeColor: PropTypes.string,
  /** wheater to draw outlines in deselected state */
  hasStroke: PropTypes.bool
}

MapSelectableMarker.defaultProps = {
  pane: 'markerPane',
  isSelected: false,
  optimizeForTouch: false,
  fillColor: colors.red,
  strokeColor: colors.bordeaux,
  hasStroke: true
}

export default MapSelectableMarker
