import { useState } from 'react'

function useDropdownSearchProps ({ suggestions, setSearchString, clearSuggestions, onResult }) {
  const [lastResult, setLastResult] = useState(null)
  const [result, setResult] = useState(null)

  return {
    textInputValue: result,
    buttonType: suggestions === null ? 'dropdown' : 'cancel',
    suggestions,
    onInput (value) {
      setResult(null)
      setSearchString(value)
    },
    onReset () {
      clearSuggestions()
      setResult(lastResult)
    },
    onResult (result) {
      onResult(result)
      setLastResult(result.label)
      setResult(result.label)
      clearSuggestions()
    }
  }
}

export default useDropdownSearchProps
