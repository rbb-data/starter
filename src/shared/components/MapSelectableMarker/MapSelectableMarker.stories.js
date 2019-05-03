import React from 'react'
import colors from '../../styles/colors.sass'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, array, boolean } from '@storybook/addon-knobs'

import Map from '../Map/Map'
import MapSelectableMarker from './MapSelectableMarker'

storiesOf('MapSelectableMarker', module)
  .addDecorator(withKnobs)
  .add('Not selected', () => {
    return <Map>
      <MapSelectableMarker
        position={array('position', [52.49, 13.4])}
        hasStroke={boolean('hasStroke', true)}
        fillColor={text('fillColor', colors.red)}
        strokeColor={text('strokeColor', colors.bordeaux)} />
    </Map>
  })
  .add('selected', () => {
    return <Map>
      <MapSelectableMarker
        isSelected
        position={array('position', [52.49, 13.4])}
        hasStroke={boolean('hasStroke', true)}
        fillColor={text('fillColor', colors.red)}
        strokeColor={text('strokeColor', colors.bordeaux)} />
    </Map>
  })
