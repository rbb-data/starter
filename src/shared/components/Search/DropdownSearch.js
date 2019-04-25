import React from 'react'
import useFuseJsSearch from './useFuseJsSearch'
import useDropdownSearchProps from './useDropdownSearchProps'
import PropTypes from 'prop-types'

import SearchInput from '../SearchInput/SearchInput'

/**
 * This is a basic example of how to use the search SearchInput component as dropdown
 * you can use this as is – or as an example for creating your own search
 */
const DropdownSearch = props => {
  const { list, onResult } = props
  const suggestionAccessors = useFuseJsSearch(list, { returnAllOnEmptyString: true })
  const searchProps = useDropdownSearchProps({ ...suggestionAccessors, onResult })

  return <SearchInput {...searchProps} />
}

DropdownSearch.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired
  })),
  onResult: PropTypes.func
}

export default DropdownSearch
