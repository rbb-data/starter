import React from 'react'
import colors from 'global_styles/colors.sass'
import { storiesOf } from '@storybook/react'

import Map from '../Map/Map'
import MapSVGLayer from './MapSVGLayer'

const someLatLngs = [
  [52.4006, 13.0638],
  [52.5419, 13.5073],
  [52.5084, 13.3903],
  [52.5094, 13.4222]
]

storiesOf('II Components/Map/MapSVGLayer', module)
  .add('draw circles for latLngs', () => {
    // this is obviously a useless example
    // but since now all you are drawing is an svg it is easier to use d3 or other tools
    // to place the markers
    return <Map>
      <MapSVGLayer>
        {leafletMap =>
          someLatLngs.map((latLng, idx) => {
            const point = leafletMap.latLngToContainerPoint(latLng)
            return <circle key={idx} fill={colors.red} r='3.5' cx={point.x} cy={point.y} />
          })
        }
      </MapSVGLayer>
    </Map>
  })
