import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'react-leaflet'
import L from 'leaflet'
import { featureToLatLng } from '../../shared/lib/geoJsonCompat'
import useWindowSize from '../../shared/lib/useWindowSize'
import mobileBreakpoint from '../../shared/styles/breakpoints.sass'
import SelectableMarker from '../../shared/components/MapSelectableMarker/MapSelectableMarker'

export default function Markers (props) {
  const { onMarkerSelect: handleMarkerSelect, markers, selectedMarkerId } = props
  const { width } = useWindowSize()

  const mapMarkers = markers.map(marker => {
    const isSelected = marker.properties.id === selectedMarkerId

    const markerProps = {
      key: marker.properties.id,
      isSelected: isSelected,
      onClick: e => {
        handleMarkerSelect(marker.properties.id)
        L.DomEvent.stopPropagation(e)
      },
      position: featureToLatLng(marker),
      pane: isSelected ? 'selectedMarkerPane' : 'markerPane',
      optimizeForTouch: width < mobileBreakpoint
    }

    return {
      isSelected,
      component: <SelectableMarker {...markerProps} />
    }
  })

  const selectedMarker = (mapMarkers.find(marker => marker.isSelected) || {}).component

  return <div>
    { mapMarkers.filter(marker => !marker.isSelected).map(marker => marker.component)}
    {/*  linePane should have zIndex: 620 and TooltipPane has zIndex: 650 */}
    <Pane name='selectedMarkerPane' style={{ zIndex: 630 }}>{selectedMarker}</Pane>
  </div>
}

Markers.propTypes = {
  onMarkerSelect: PropTypes.func,
  /* array of geojson features */
  markers: PropTypes.array,
  selectedMarkerId: PropTypes.string
}
