import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import colors from '../../styles/colors.sass'

import Map from '../Map/Map'
import MapPolygonWithAbsolutePoints from './MapPolygonWithAbsolutePoints'

storiesOf('MapPolygonWithAbsolutePoints', module)
  .addDecorator(withKnobs)
  .add('at bottom right', () => {
    const polygonProps = {
      positionsOnMap: [{ lat: 52.49, lng: 13.4 }],
      pointCalculationFunctions: [
        ({ width, height }) => ({ x: width * 0.8, y: height }),
        ({ width, height }) => ({ x: width * 0.8 + 10, y: height })
      ],
      fillOpacity: 1,
      fillColor: text('fillColor', colors.darkGrey),
      color: text('color', colors.darkGrey),
      weight: 1
    }

    return <Map bingKey={text('bingKey for Map', '')}>
      <MapPolygonWithAbsolutePoints {...polygonProps} />
    </Map>
  })
  .add('at top right', () => {
    const polygonProps = {
      positionsOnMap: [{ lat: 52.49, lng: 13.4 }],
      pointCalculationFunctions: [
        ({ width, height }) => ({ x: width * 0.8, y: 0 }),
        ({ width, height }) => ({ x: width * 0.8 + 10, y: 0 })
      ],
      fillOpacity: 1,
      fillColor: text('fillColor', colors.darkGrey),
      color: text('color', colors.darkGrey),
      weight: 1
    }

    return <Map bingKey={text('bingKey for Map', '')}>
      <MapPolygonWithAbsolutePoints {...polygonProps} />
    </Map>
  })
  .add('at left center', () => {
    const polygonProps = {
      positionsOnMap: [{ lat: 52.49, lng: 13.4 }],
      pointCalculationFunctions: [
        ({ width, height }) => ({ x: 0, y: height / 2 }),
        ({ width, height }) => ({ x: 0, y: height / 2 + 10 })
      ],
      fillOpacity: 1,
      fillColor: text('fillColor', colors.darkGrey),
      color: text('color', colors.darkGrey),
      weight: 1
    }

    return <Map bingKey={text('bingKey for Map', '')}>
      <MapPolygonWithAbsolutePoints {...polygonProps} />
    </Map>
  })
  .add('multiple points on map', () => {
    const polygonProps = {
      positionsOnMap: [
        { lat: 52.49, lng: 13.4 },
        { lat: 52.52, lng: 13.5 }
      ],
      pointCalculationFunctions: [
        ({ width, height }) => ({ x: 0, y: height / 2 })
      ],
      fillOpacity: 1,
      fillColor: text('fillColor', 'transparent'),
      color: text('color', colors.darkGrey),
      weight: 1
    }

    return <Map>
      <MapPolygonWithAbsolutePoints {...polygonProps} />
    </Map>
  })
