import React from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import { Pane } from 'react-leaflet'
import { darkGrey } from '../../shared/styles/colors.sass'
import MapPolygonWithAbsolutePoints from '../../shared/components/MapPolygonWithAbsolutePoints/MapPolygonWithAbsolutePoints'
import Markers from '../Markers/Markers'

/* This is what is rendered on the map */
export default function MapElements (props) {
  const { markers, selectedMarkerId, onSelectMarkerId: setSelectedMarkerId } = props

  if (!markers) return null

  const selectedMarker = find(markers, marker => marker.properties.id === selectedMarkerId)

  const polygonProps = {
    positionsOnMap: [{
      lat: selectedMarker.geometry.coordinates[1],
      lng: selectedMarker.geometry.coordinates[0]
    }],
    pointCalculationFunctions: [
      ({ width, height }) => ({ x: width * 0.8, y: -2 }),
      ({ width, height }) => ({ x: width * 0.8 + 10, y: -2 })
    ],
    fillOpacity: 1,
    fillColor: darkGrey,
    color: darkGrey,
    weight: 1
  }

  return <>
    <Markers
      markers={markers}
      selectedMarkerId={selectedMarkerId}
      onMarkerSelect={setSelectedMarkerId} />
    {/*  markerPane has zIndex: 600; selectedMarkerPane has: 640 and TooltipPane has: 650 */}
    <Pane name='linePane' style={{ zIndex: 620 }}>
      <MapPolygonWithAbsolutePoints {...polygonProps} />
    </Pane>
  </>
}

MapElements.propTypes = {
  markers: PropTypes.array,
  selectedMarkerId: PropTypes.string,
  onSelectMarkerId: PropTypes.func
}
