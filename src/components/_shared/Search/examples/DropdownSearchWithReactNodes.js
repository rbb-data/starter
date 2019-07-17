import React from 'react'
import useFuseJsSearch from '../hooks/useFuseJsSearch'
import useDropdownSearchProps from '../hooks/useDropdownSearchProps'
import PropTypes from 'prop-types'

import SearchInput from '../../SearchInput/SearchInput'

/**
 * This is a basic example of how to customize the search
 */
const DropdownSearchWithReactNodes = props => {
  const { list, fuseOptions, formatString, formatNode, onResult } = props

  const { suggestions, setSearchString } = useFuseJsSearch(list, {
    ...fuseOptions,
    returnAllOnEmptyString: true
  })

  const dropdownSearchProps = useDropdownSearchProps({
    suggestions,
    setSearchString,
    // useDropdownSearchProps expects `format` to return a string
    format: formatString,
    onResult
  })

  // set our own format prop not the one useDropdownSearchProps uses
  const searchProps = {
    ...dropdownSearchProps,
    format: formatNode
  }

  return <SearchInput {...searchProps} />
}

DropdownSearchWithReactNodes.propTypes = {
  list: PropTypes.array,
  fuseOptions: PropTypes.object,
  formatString: PropTypes.func,
  formatNode: PropTypes.func,
  onResult: PropTypes.func
}

export default DropdownSearchWithReactNodes
