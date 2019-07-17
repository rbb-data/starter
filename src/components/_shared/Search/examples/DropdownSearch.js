import React from 'react'
import useFuseJsSearch from '../hooks/useFuseJsSearch'
import useDropdownSearchProps from '../hooks/useDropdownSearchProps'
import PropTypes from 'prop-types'

import SearchInput from '../../SearchInput/SearchInput'

/**
 * This is a basic example of how to use the search SearchInput component as dropdown
 * you can use this as is – or as an example for creating your own search
 */
const DropdownSearch = props => {
  const { list, fuseOptions, format, onResult, placeholder } = props
  const { suggestions, setSearchString } = useFuseJsSearch(list, {
    ...fuseOptions,
    returnAllOnEmptyString: true
  })
  const searchProps = useDropdownSearchProps({ suggestions, setSearchString, format, onResult })

  return <SearchInput {...searchProps} placeholder={placeholder} />
}

DropdownSearch.propTypes = {
  list: PropTypes.array,
  fuseOptions: PropTypes.object,
  format: PropTypes.func,
  onResult: PropTypes.func,
  placeholder: PropTypes.string
}

export default DropdownSearch
