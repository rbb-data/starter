import React from 'react'
import PropTypes from 'prop-types'
// import lodash like this to not import all of lodash
import findIndex from 'lodash/findIndex'
import Slider from '../../shared/components/Slider/Slider'
import Slide from './Slide'
import _ from './Detail.module.sass'

function getSlide (marker) {
  if (!marker) return null
  return <Slide feature={marker} />
}

export default function Detail (props) {
  const { className, markers, selectedMarkerId, onSelectMarkerId } = props

  if (markers === null) return 'loading'

  const selectedMarkerIndex = findIndex(markers, marker => marker.properties.id === selectedMarkerId)
  const prevMarker = markers[selectedMarkerIndex - 1]
  const currentMarker = markers[selectedMarkerIndex]
  const nextMarker = markers[selectedMarkerIndex + 1]

  return <div className={`${_.detail} ${className}`}>
    <Slider
      onBackwardNavigation={() => { onSelectMarkerId(prevMarker.properties.id) }}
      onForwardNavigation={() => { onSelectMarkerId(nextMarker.properties.id) }}>

      {() => getSlide(prevMarker)}
      {() => getSlide(currentMarker)}
      {() => getSlide(nextMarker)}
    </Slider>
  </div>
}

Detail.propTypes = {
  className: PropTypes.string,
  markers: PropTypes.array,
  selectedMarkerId: PropTypes.string,
  onSelectMarkerId: PropTypes.func
}
