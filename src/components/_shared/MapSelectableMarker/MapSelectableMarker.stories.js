import React from 'react'
import colors from 'global_styles/colors.sass'
import Map from '../Map/Map'
import MapSelectableMarker from './MapSelectableMarker'

export default {
  title: 'II Components/Map/MapSelectableMarker',
  component: MapSelectableMarker,
}

export const NotSelected = (args) => (
  <Map>
    <MapSelectableMarker {...args} />
  </Map>
)
NotSelected.args = {
  position: [52.49, 13.4],
  hasStroke: true,
  fillColor: colors.red,
  strokeColor: colors.bordeaux,
}

export const Selected = () => (
  <Map>
    <MapSelectableMarker {...args} />
  </Map>
)
NotSelected.args = {
  isSelected: true,
  position: [52.49, 13.4],
  hasStroke: true,
  fillColor: colors.red,
  strokeColor: colors.bordeaux,
}
