import { useState, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { autocomplete, fixBerlinSearchResult } from './openrouteservice.js'

const label = feature => `${feature.properties.name}, ${feature.properties.neighbourhood ? `${feature.properties.neighbourhood},` : ''} ${feature.properties.region}`

const makeRequest = debounce(async (searchString, setSuggestions) => {
  // TODO:
  const layers = ['address']
  const location = 'berlin'

  if (searchString === null || searchString.trim() === '') return null

  const params = { layers: layers.join(','), text: searchString, location }
  const result = await autocomplete(params)
  const features = result.features
    .map(feature => fixBerlinSearchResult(feature))
    .map(feature => ({
      label: label(feature),
      value: {
        ...feature,
        type: 'location',
        location: {
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0]
        }
      }
    }))

  setSuggestions(features)
}, 300, { 'leading': true, 'trailing': true })

function useOpenrouteservice (config) {
  const [searchString, setSearchString] = useState(null)
  const [suggestions, setSuggestions] = useState(null)

  useEffect(() => { makeRequest(searchString, setSuggestions) }, [searchString])

  function clearSuggestions () {
    setSuggestions(null)
    setSearchString(null)
  }

  return { suggestions, setSearchString, clearSuggestions }
}

export default useOpenrouteservice
