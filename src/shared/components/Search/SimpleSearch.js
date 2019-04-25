import React, { useState } from 'react'
import useFuseJsSearch from './useFuseJsSearch'
import PropTypes from 'prop-types'

import SearchInput from '../SearchInput/SearchInput'

/**
 * This is a basic example of how to use the search input
 * you can use this as a ready component or as an example to create your own search from
 */
export const SimpleSearch = props => {
  const { list, keepInputOnFocus, onResult, onReset } = props

  const { suggestions, setSearchString, clearSuggestions } = useFuseJsSearch(list)
  const [hasResult, setHasResult] = useState(false)

  return <SearchInput
    buttonType={hasResult ? 'cancel' : 'search'}
    keepInputOnFocus={keepInputOnFocus}
    suggestions={suggestions}
    onInput={setSearchString}
    onReset={() => {
      onReset()
      clearSuggestions()
      setHasResult(false)
    }}
    onResult={value => {
      onResult(value)
      clearSuggestions()
      setHasResult(true)
    }} />
}

SimpleSearch.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.node.isRequired
  })),
  keepInputOnFocus: PropTypes.bool,
  onResult: PropTypes.func,
  onReset: PropTypes.func
}

SimpleSearch.defaultProps = {
  keepInputOnFocus: true
}

export default SimpleSearch
