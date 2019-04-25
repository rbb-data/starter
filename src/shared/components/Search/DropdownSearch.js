import React, { useState } from 'react'
import useFuseJsSearch from './useFuseJsSearch'
import PropTypes from 'prop-types'

import SearchInput from '../SearchInput/SearchInput'

/**
 * This is a basic example of how to use the search SearchInput component as dropdown
 * you can use this as is or as an example to create your own search from
 */
const DropdownSearch = props => {
  const { list, onResult } = props
  const {
    suggestions,
    setSearchString,
    clearSuggestions
  } = useFuseJsSearch(list, { returnAllOnEmptyString: true })
  const [lastResult, setLastResult] = useState(null)
  const [result, setResult] = useState(null)

  return <SearchInput
    textInputValue={result}
    buttonType={suggestions === null ? 'dropdown' : 'cancel'}
    suggestions={suggestions}
    onInput={value => {
      setResult(null)
      setSearchString(value)
    }}
    onReset={() => {
      clearSuggestions()
      setResult(lastResult)
    }}
    onResult={result => {
      onResult(result)
      setLastResult(result.label)
      setResult(result.label)
      clearSuggestions()
    }} />
}

DropdownSearch.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired
  })),
  onResult: PropTypes.func
}

export default DropdownSearch
