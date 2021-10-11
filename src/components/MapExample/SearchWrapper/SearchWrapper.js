import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { featureToLatLng } from 'lib/geoJsonCompat'
import MixedSearch from 'components/_shared/Search/examples/MixedSearch'
import InfoBox from 'components/_shared/InfoBox/InfoBox'
import MapLocator from 'components/_shared/MapLocator/MapLocator'
import _ from './SearchWrapper.module.sass'

function SearchWrapper (props) {
  const { markers, onSelectMarkerId: setSelectedMarkerId } = props
  const [resultLatLng, setResultLatLng] = useState(null)

  return <div className={_.search}>
    <MixedSearch
      list={markers}
      format={marker => marker.properties.title}
      fuseOptions={{ keys: ['properties.title'] }}
      placeholder='Nach Ort oder Beispiel suchen'
      onResult={result => {
        if (result.type === 'location') {
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

SearchWrapper.propTypes = {
  /** a geojson feature array */
  markers: PropTypes.array,
  /** called when the selected search result is a marker */
  onSelectMarkerId: PropTypes.func
}

export default SearchWrapper
