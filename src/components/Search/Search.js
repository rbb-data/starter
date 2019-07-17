import React, { useState } from 'react'
import { featureToLatLng } from 'lib/geoJsonCompat'
import MixedSearch from 'components/_shared/Search/examples/MixedSearch'
import InfoBox from 'components/_shared/InfoBox/InfoBox'
import MapLocator from 'components/_shared/MapLocator/MapLocator'
import _ from './Search.module.sass'

function Search (props) {
  const { markers, onSelectMarkerId: setSelectedMarkerId } = props
  const [resultLatLng, setResultLatLng] = useState(null)

  return <div className={_.search}>
    <MixedSearch
      list={markers}
      format={marker => marker.properties.title}
      fuseOptions={{ keys: ['properties.title'] }}
      onResult={result => {
        if (result.type === 'location') {
          console.log(result)
          setResultLatLng(featureToLatLng(result))
        } else {
          setSelectedMarkerId(result.properties.id)
        }
      }}
      onReset={() => { setResultLatLng(null) }}
    />
    <InfoBox className={_.infoBox}>
      Bei Nutzung der Suchfunktion werden Daten an <a target='_blank' rel='noopener noreferrer' href='https://openrouteservice.org/'>openrouteservice</a> übertragen.
      Weitere Informationen auf der rbb <a target='_blank' rel='noopener noreferrer' href='https://www.rbb-online.de/datenschutz/datenschutzerklaerung.html'>
      Datenschutzerklärung</a>.
    </InfoBox>
    {resultLatLng !== null && <MapLocator position={resultLatLng} />}
  </div>
}

export default Search
