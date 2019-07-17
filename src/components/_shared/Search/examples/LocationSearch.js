import React from 'react'
import useOpenrouteservice, { format } from '../hooks/useOpenrouteservice'
import useDefaultSearchProps from '../hooks/useDefaultSearchProps'
import PropTypes from 'prop-types'

import SearchInput from '../../SearchInput/SearchInput'

/**
 * This is a basic example of how to use the SearchInput component with Openrouteservice
 * you can use this as is – or as an example for creating your own search
 */
const LocationSearch = props => {
  const { keepInputOnFocus, openrouteConfig, onResult, onReset } = props

  const { suggestions, setSearchString } = useOpenrouteservice(openrouteConfig)
  const searchProps = useDefaultSearchProps({ suggestions, setSearchString, format, onReset, onResult })

  return <SearchInput {...searchProps} keepInputOnFocus={keepInputOnFocus} />
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
  openrouteConfig: { layers: ['street'], location: 'berlin', sources: ['osm'] },
  keepInputOnFocus: true
}

export default LocationSearch
