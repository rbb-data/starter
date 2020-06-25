import React from 'react'
import colors from 'global_styles/colors.sass'
import { withKnobs, text, array, boolean } from '@storybook/addon-knobs'
import Map from '../Map/Map'
import MapSelectableMarker from './MapSelectableMarker'

export default {
  title: 'II Components/Map/MapSelectableMarker',
  decorators: [withKnobs],
  component: MapSelectableMarker,
}

export const NotSelected = () => (
  <Map>
    <MapSelectableMarker
      position={array('position', [52.49, 13.4])}
      hasStroke={boolean('hasStroke', true)}
      fillColor={text('fillColor', colors.red)}
      strokeColor={text('strokeColor', colors.bordeaux)}
    />
  </Map>
)

export const Selected = () => (
  <Map>
    <MapSelectableMarker
      isSelected
      position={array('position', [52.49, 13.4])}
      hasStroke={boolean('hasStroke', true)}
      fillColor={text('fillColor', colors.red)}
      strokeColor={text('strokeColor', colors.bordeaux)}
    />
  </Map>
)
