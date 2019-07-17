import React from 'react'
import useOpenrouteservice, { format as orFormat } from '../hooks/useOpenrouteservice'
import useFuseJsSearch from '../hooks/useFuseJsSearch'
import useDefaultSearchProps from '../hooks/useDefaultSearchProps'
import PropTypes from 'prop-types'

import SearchInput from '../../SearchInput/SearchInput'

/**
 * This is a basic example of how to use the SearchInput component with Openrouteservice
 * you can use this as is – or as an example for creating your own search
 * This component thinks a result is from openrouteservice when it has the type location
 * so if you provide a list with objects that have { type: 'location' } your format function wont work
 */
const MixedSearch = props => {
  const { keepInputOnFocus, list, format: fuseFormat, fuseOptions, openrouteConfig, onResult, onReset, placeholder } = props

  const { suggestions: fuseSuggestions, setSearchString: setFuseSearchString } = useFuseJsSearch(list, fuseOptions)
  const { suggestions: orSuggestions, setSearchString: setOrSearchString } = useOpenrouteservice(openrouteConfig)
  const setSearchString = searchString => {
    setFuseSearchString(searchString)
    setOrSearchString(searchString)
  }

  const format = result => {
    if (result.type === 'location') return orFormat(result)
    return fuseFormat(result)
  }

  const suggestions = fuseSuggestions === null && orSuggestions === null
    ? null
    : [...(fuseSuggestions || []), ...(orSuggestions || [])]
  const searchProps = useDefaultSearchProps({ suggestions, setSearchString, format, onReset, onResult })

  return <SearchInput {...searchProps} placeholder={placeholder} keepInputOnFocus={keepInputOnFocus} />
}

MixedSearch.propTypes = {
  /** see: https://openrouteservice.org/dev/#/api-docs/geocode/autocomplete/get */
  openrouteConfig: PropTypes.shape({
    location: PropTypes.oneOf(['berlin', 'brandenburg']),
    layers: PropTypes.arrayOf(PropTypes.string),
    sources: PropTypes.arrayOf(PropTypes.string)
  }),
  fuseOptions: PropTypes.object,
  list: PropTypes.array,
  format: PropTypes.func,
  keepInputOnFocus: PropTypes.bool,
  onResult: PropTypes.func,
  onReset: PropTypes.func,
  placeholder: PropTypes.string
}

MixedSearch.defaultProps = {
  openrouteConfig: { layers: ['street'], location: 'berlin', sources: ['osm'] },
  keepInputOnFocus: true,
  format: value => value
}

export default MixedSearch
