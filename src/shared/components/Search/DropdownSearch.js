import React from 'react'
import useFuseJsSearch from './useFuseJsSearch'
import PropTypes from 'prop-types'

import SearchInput from '../SearchInput/SearchInput'

/**
 * This is a basic example of how to use the search input as a dropdown
 * you can use this as a ready component or as an example to create your own search from
 */
const DropdownSearch = props => {
  const { list, onResult } = props
  const {
    suggestions,
    setSearchString,
    clearSuggestions
  } = useFuseJsSearch(list, { returnAllOnEmptyString: true })

  return <SearchInput
    buttonType={suggestions === null ? 'dropdown' : 'cancel'}
    suggestions={suggestions}
    onInput={setSearchString}
    onReset={clearSuggestions}
    onResult={value => {
      onResult(value)
      clearSuggestions()
    }} />
}

DropdownSearch.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.node.isRequired
  })),
  onResult: PropTypes.func
}

export default DropdownSearch
