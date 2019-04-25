import { useState } from 'react'

function useDropdownSearchProps ({ suggestions, setSearchString, clearSuggestions, onResult }) {
  const [value, setValue] = useState('')
  const [lastResult, setLastResult] = useState(null)

  return {
    value: value,
    suggestions: suggestions,
    buttonType: suggestions === null ? 'dropdown' : 'cancel',
    onInput (value) {
      setValue(value)

      setSearchString(value)
    },
    onReset () {
      setValue(lastResult)

      clearSuggestions()
    },
    onResult (result) {
      setLastResult(result.label)
      setValue(result.label)

      onResult(result)
      clearSuggestions()
    }
  }
}

export default useDropdownSearchProps
