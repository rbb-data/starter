import React, { useState } from 'react'
import useOpenrouteservice from './useOpenrouteservice'
import PropTypes from 'prop-types'

import SearchInput from '../SearchInput/SearchInput'

/**
 * This is a basic example of how to use the SearchInput component
 * you can use this as is or as an example to create your own search from
 */
const LocationSearch = props => {
  const { keepInputOnFocus, onResult, onReset } = props

  const { suggestions, setSearchString, clearSuggestions } = useOpenrouteservice()
  const [result, setResult] = useState(null)

  return <SearchInput
    textInputValue={result}
    buttonType={result ? 'cancel' : 'search'}
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
  keepInputOnFocus: PropTypes.bool,
  onResult: PropTypes.func,
  onReset: PropTypes.func
}

LocationSearch.defaultProps = {
  keepInputOnFocus: true
}

export default LocationSearch
