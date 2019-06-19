/* global fetch */

import React, { useState, useEffect } from 'react'
import 'whatwg-fetch'
import Map from '../../shared/components/Map/Map'
import Detail from '../Detail/Detail'
import _ from './App.module.sass'

function App (props) {
  const [markers, setMarkers] = useState(null)
  const [selectedMarkerId, setSelectedMarkerId] = useState('0')

  useEffect(() => {
    async function fetchMarkers () {
      const res = await fetch('./markers.geo.json')
      const json = await res.json()
      setMarkers(json.features)
    }

    fetchMarkers()
  }, [])
  // ⬆️ the second parameter to useEffect are its dependencies
  //  if the array is empty it runs only once otherwise it runs when depencies change

  const position = [52, 12]
  return <div className={_.app}>
    <Detail
      className={_.detail}
      markers={markers}
      selectedMarkerId={selectedMarkerId}
      onSelectMarkerId={setSelectedMarkerId} />
    <Map
      bingKey={process.env.REACT_APP_BING_KEY}
      className={_.map}
      center={position} />
  </div>
}

export default App
