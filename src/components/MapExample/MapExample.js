/* global fetch */

import React, { useState, useEffect } from 'react'
import Map from 'components/_shared/Map/Map'
import MapElements from 'components/MapElements/MapElements'
import SearchWrapper from 'components/SearchWrapper/SearchWrapper'
import Detail from 'components/Detail/Detail'
import _ from './App.module.sass'

function App (props) {
  const [markers, setMarkers] = useState(null)
  const [selectedMarkerId, setSelectedMarkerId] = useState('0')

  useEffect(() => {
    async function fetchMarkers () {
      const res = await fetch(`${window.location.origin}/markers.geo.json`)
      const json = await res.json()
      setMarkers(json.features)
    }

    fetchMarkers()
  }, [])
  // ⬆️ the second parameter to useEffect are its dependencies
  //  if the array is empty it runs only once otherwise it runs when depencies change

  return <div className={_.app}>
    <Detail
      className={_.detail}
      markers={markers}
      selectedMarkerId={selectedMarkerId}
      onSelectMarkerId={setSelectedMarkerId}
    />
    <div className={_.mapWrapper}>
      <Map
        bingKey={process.env.REACT_APP_BING_KEY}
        className={_.map}
      >
        <MapElements
          markers={markers}
          onSelectMarkerId={setSelectedMarkerId}
          selectedMarkerId={selectedMarkerId}
        />
        <SearchWrapper
          markers={markers}
          onSelectMarkerId={setSelectedMarkerId}
        />
      </Map>
    </div>
  </div>
}

export default App
