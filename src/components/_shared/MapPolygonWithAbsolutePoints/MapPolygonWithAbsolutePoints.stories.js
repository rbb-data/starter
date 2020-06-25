import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import colors from 'global_styles/colors.sass'
import Map from '../Map/Map'
import MapPolygonWithAbsolutePoints from './MapPolygonWithAbsolutePoints'

export default {
  title: 'II Components/Map/MapPolygonWithAbsolutePoints',
  decorators: [withKnobs],
  component: MapPolygonWithAbsolutePoints,
}

export const AtBottomRight = () => {
  const polygonProps = {
    positionsOnMap: [{ lat: 52.49, lng: 13.4 }],
    pointCalculationFunctions: [
      ({ width, height }) => ({ x: width * 0.8, y: height }),
      ({ width, height }) => ({ x: width * 0.8 + 10, y: height }),
    ],
    fillOpacity: 1,
    fillColor: text('fillColor', colors.darkGrey),
    color: text('color', colors.darkGrey),
    weight: 1,
  }

  return (
    <Map>
      <MapPolygonWithAbsolutePoints {...polygonProps} />
    </Map>
  )
}

export const AtTopRight = () => {
  const polygonProps = {
    positionsOnMap: [{ lat: 52.49, lng: 13.4 }],
    pointCalculationFunctions: [
      ({ width, height }) => ({ x: width * 0.8, y: 0 }),
      ({ width, height }) => ({ x: width * 0.8 + 10, y: 0 }),
    ],
    fillOpacity: 1,
    fillColor: text('fillColor', colors.darkGrey),
    color: text('color', colors.darkGrey),
    weight: 1,
  }

  return (
    <Map>
      <MapPolygonWithAbsolutePoints {...polygonProps} />
    </Map>
  )
}

export const AtLeftCenter = () => {
  const polygonProps = {
    positionsOnMap: [{ lat: 52.49, lng: 13.4 }],
    pointCalculationFunctions: [
      ({ width, height }) => ({ x: 0, y: height / 2 }),
      ({ width, height }) => ({ x: 0, y: height / 2 + 10 }),
    ],
    fillOpacity: 1,
    fillColor: text('fillColor', colors.darkGrey),
    color: text('color', colors.darkGrey),
    weight: 1,
  }

  return (
    <Map>
      <MapPolygonWithAbsolutePoints {...polygonProps} />
    </Map>
  )
}

export const MultiplePointsOnMap = () => {
  const polygonProps = {
    positionsOnMap: [
      { lat: 52.49, lng: 13.4 },
      { lat: 52.52, lng: 13.5 },
    ],
    pointCalculationFunctions: [
      ({ width, height }) => ({ x: 0, y: height / 2 }),
    ],
    fillOpacity: 1,
    fillColor: text('fillColor', 'transparent'),
    color: text('color', colors.darkGrey),
    weight: 1,
  }

  return (
    <Map>
      <MapPolygonWithAbsolutePoints {...polygonProps} />
    </Map>
  )
}
