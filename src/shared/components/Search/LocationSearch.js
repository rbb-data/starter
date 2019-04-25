import React, { useState } from 'react'
import useOpenrouteservice from './useOpenrouteservice'
import PropTypes from 'prop-types'

import SearchInput from '../SearchInput/SearchInput'

/**
 * This is a basic example of how to use the SearchInput component
 * you can use this as is or as an example to create your own search from
 */
const LocationSearch = props => {
  const { keepInputOnFocus, openrouteConfig, onResult, onReset } = props

  const { suggestions, setSearchString, clearSuggestions } = useOpenrouteservice(openrouteConfig)
  const [result, setResult] = useState(null)
  const showCancel = result || (suggestions && suggestions.length === 0)

  return <SearchInput
    textInputValue={result}
    buttonType={showCancel ? 'cancel' : 'search'}
    keepInputOnFocus={keepInputOnFocus}
    suggestions={suggestions}
    onInput={setSearchString}
    onReset={() => {
      onReset()
      clearSuggestions()
      setResult(null)
    }}
    onResult={result => {
      onResult(result)
      setResult(result.label)
      clearSuggestions()
    }} />
}

LocationSearch.propTypes = {
  /** see: https://openrouteservice.org/dev/#/api-docs/geocode/autocomplete/get */
  openrouteConfig: PropTypes.shape({
    location: PropTypes.oneOf(['berlin', 'brandenburg']),
    layers: PropTypes.arrayOf(PropTypes.string),
    sources: PropTypes.arrayOf(PropTypes.string)
  }),
  keepInputOnFocus: PropTypes.bool,
  onResult: PropTypes.func,
  onReset: PropTypes.func
}

LocationSearch.defaultProps = {
  openrouteConfig: { layers: ['street'], location: 'berlin', sources: 'osm' },
  keepInputOnFocus: true
}

export default LocationSearch
