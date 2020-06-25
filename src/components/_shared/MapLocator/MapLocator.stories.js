import React from 'react'
import Map from '../Map/Map'
import MapLocator from './MapLocator'

export default {
  title: 'II Components/Map/MapLocator',
  component: MapLocator,
}

export const Basic = () => (
  <Map>
    <MapLocator position={[52.49, 13.4]} />
  </Map>
)
