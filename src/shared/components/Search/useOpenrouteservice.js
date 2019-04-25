import { useState, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { autocomplete, fixBerlinSearchResult } from './openrouteservice.js'

const label = feature => `${feature.properties.name}, ${feature.properties.neighbourhood ? `${feature.properties.neighbourhood},` : ''} ${feature.properties.region}`

const makeRequest = debounce(async ({ searchString, config, setSuggestions }) => {
  if (searchString === null || searchString.trim() === '') return null

  // format config so it can be consumed by the api
  const { layers, location, sources } = config
  const params = {
    layers: layers.join(','),
    sources: sources.join(','),
    location: location,
    text: searchString
  }

  // get autocomplete results from api
  const result = await autocomplete(params)
  const features = result.features
    .map(feature => fixBerlinSearchResult(feature))
    // format for use in SearchInput
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
  const [searchString, setInternalSearchString] = useState(null)
  const [suggestions, setSuggestions] = useState(null)

  useEffect(() => {
    makeRequest({ searchString, config, setSuggestions })
  }, [searchString])

  function setSearchString (searchString) {
    if (searchString === null) setSuggestions(null)
    setInternalSearchString(searchString)
  }

  return { suggestions, setSearchString }
}

export default useOpenrouteservice
