import { useState } from 'react'

function useDefaultSearchProps ({ suggestions, setSearchString, clearSuggestions, onReset, onResult }) {
  const [result, setResult] = useState(null)
  const showCancel = result || (suggestions && suggestions.length === 0)

  return {
    textInputValue: result,
    buttonType: showCancel ? 'cancel' : 'search',
    suggestions,
    keepInputOnFocus: true,
    onInput: setSearchString,
    onReset () {
      onReset()
      clearSuggestions()
      setResult(null)
    },
    onResult (result) {
      onResult(result)
      setResult(result.label)
      clearSuggestions()
    }
  }
}

export default useDefaultSearchProps
