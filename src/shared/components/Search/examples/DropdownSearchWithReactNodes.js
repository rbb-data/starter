import React from 'react'
import useFuseJsSearch from '../hooks/useFuseJsSearch'
import useDropdownSearchProps from '../hooks/useDropdownSearchProps'
import PropTypes from 'prop-types'

import SearchInput from '../../SearchInput/SearchInput'

// this is mostly just a copy from useDropdownSearchProps
// the only difference is in `onResult`
// function useCustomSearchProps ({ suggestions, suggestionsWithNodes, setSearchString, onResult }) {
//   const [value, setValue] = useState('')
//   const [lastResult, setLastResult] = useState(null)
//
//   return {
//     value: value,
//     suggestions: suggestionsWithNodes,
//     buttonType: suggestionsWithNodes === null ? 'dropdown' : 'cancel',
//     onInput (value) {
//       // update internal state
//       setValue(value)
//
//       // calll external handlers
//       setSearchString(value)
//     },
//     onReset () {
//       // update internal state
//       setValue(lastResult)
//
//       // calll external handlers
//       setSearchString(null)
//     },
//     onResult (result) {
//       // get the original suggestion so we can read the unmodified string value
//       // because SearchInput requires value to be a string
//       const suggestion = suggestions.find(s => s.value === result.value)
//
//       // update internal state
//       setLastResult(suggestion.label)
//       setValue(suggestion.label)
//
//       // calll external handlers
//       setSearchString(null)
//       onResult(result)
//     }
//   }
// }

/**
 * This is a basic example of how to customize the search
 */
const DropdownSearchWithReactNodes = props => {
  const { list, fuseOptions, formatString, formatNode, onResult } = props

  const { suggestions, setSearchString } = useFuseJsSearch(list, {
    ...fuseOptions,
    returnAllOnEmptyString: true
  })

  // add some circles to our suggestions
  // const suggestionsWithNodes = suggestions === null
  //   ? null
  //   : suggestions.map(item => ({
  //     ...item,
  //     label: <div>{circle}{item.label}</div>
  //   }))

  const dropdownSearchProps = useDropdownSearchProps({
    suggestions,
    setSearchString,
    format: formatString,
    onResult
  })

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
