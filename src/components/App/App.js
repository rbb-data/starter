/* global fetch */

import React, { useState, useEffect } from 'react'
import 'whatwg-fetch'
import Map from '../../shared/components/Map/Map'
import MixedSearch from '../../shared/components/Search/examples/MixedSearch'
import InfoBox from '../../shared/components/InfoBox/InfoBox'
import MapElements from '../MapElements/MapElements'
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

  return <div className={_.app}>
    <Detail
      className={_.detail}
      markers={markers}
      selectedMarkerId={selectedMarkerId}
      onSelectMarkerId={setSelectedMarkerId} />
    <div className={_.mapWrapper}>
      <Map
        bingKey={process.env.REACT_APP_BING_KEY}
        className={_.map}>

        <MapElements
          markers={markers}
          onSelectMarkerId={setSelectedMarkerId}
          selectedMarkerId={selectedMarkerId} />
      </Map>
      <div className={_.search}>
        <MixedSearch
          list={markers}
          format={marker => marker.properties.title}
          fuseOptions={{ keys: ['properties.title'] }}
          onResult={result => {
            if (result.type === 'location') return // TODO
            setSelectedMarkerId(result.properties.id)
          }} />
        <InfoBox className={_.infoBox}>
          Bei Nutzung der Suchfunktion werden Daten an <a target='_blank' href='https://openrouteservice.org/'>openrouteservice</a> übertragen.
          Weitere Informationen auf der rbb <a target='_blank' href='https://www.rbb-online.de/datenschutz/datenschutzerklaerung.html'>
          Datenschutzerklärung</a>.
        </InfoBox>
      </div>
    </div>
  </div>
}

export default App
