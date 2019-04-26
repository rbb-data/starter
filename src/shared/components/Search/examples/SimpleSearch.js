import React from 'react'
import useFuseJsSearch from '../hooks/useFuseJsSearch'
import useDefaultSearchProps from '../hooks/useDefaultSearchProps'
import PropTypes from 'prop-types'

import SearchInput from '../../SearchInput/SearchInput'

/**
 * This is a basic example of how to use the SearchInput component
 * you can use this as is – or as an example for creating your own search
 */
const SimpleSearch = props => {
  const { list, keepInputOnFocus, fuseOptions, format, onResult, onReset } = props

  const { suggestions, setSearchString } = useFuseJsSearch(list, fuseOptions)
  const searchProps = useDefaultSearchProps({ suggestions, setSearchString, format, onReset, onResult })

  return <SearchInput {...searchProps} keepInputOnFocus={keepInputOnFocus} />
}

SimpleSearch.propTypes = {
  list: PropTypes.array,
  fuseOptions: PropTypes.object,
  keepInputOnFocus: PropTypes.bool,
  format: PropTypes.func,
  onResult: PropTypes.func,
  onReset: PropTypes.func
}

SimpleSearch.defaultProps = {
  keepInputOnFocus: true
}

export default SimpleSearch
