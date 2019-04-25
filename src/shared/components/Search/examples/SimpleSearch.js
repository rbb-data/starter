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
  const { list, keepInputOnFocus, onResult, onReset } = props

  const { suggestions, setSearchString } = useFuseJsSearch(list)
  const searchProps = useDefaultSearchProps({ suggestions, setSearchString, onReset, onResult })

  return <SearchInput {...searchProps} keepInputOnFocus={keepInputOnFocus} />
}

SimpleSearch.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired
  })),
  keepInputOnFocus: PropTypes.bool,
  onResult: PropTypes.func,
  onReset: PropTypes.func
}

SimpleSearch.defaultProps = {
  keepInputOnFocus: true
}

export default SimpleSearch
