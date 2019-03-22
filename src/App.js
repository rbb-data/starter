import React, { Component, Fragment } from 'react'
import './App.css'

// ⬇️ this is important ⬇️
import 'leaflet/dist/leaflet.css'

import { Map, TileLayer } from 'react-leaflet'

class App extends Component {
  render () {
    const position = [52, 12]
    return <Fragment>
      <Map center={position} zoom={13} style={{ height: 300 }}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
        />
      </Map>
    </Fragment>
  }
}

export default App
