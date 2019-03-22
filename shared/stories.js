import React from 'react'

import { storiesOf } from '@storybook/react'

import 'leaflet/dist/leaflet.css'
import { Map, TileLayer } from 'react-leaflet'

storiesOf('Shared Components', module)
  .add('react-leaflet', () => (
    <Map center={[52, 12]} zoom='13' style={{ height: 300, width: 400 }}>
      <TileLayer
        attribution='&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </Map>
  ))
