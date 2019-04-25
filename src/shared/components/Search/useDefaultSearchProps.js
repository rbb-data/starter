import { useState } from 'react'

function useDefaultSearchProps ({ suggestions, setSearchString, clearSuggestions, onReset, onResult }) {
  const [value, setValue] = useState('')
  const [hasResult, setHasResult] = useState(false)
  const showCancel = hasResult || (suggestions && suggestions.length === 0)

  return {
    value: value,
    suggestions: suggestions,
    buttonType: showCancel ? 'cancel' : 'search',
    keepInputOnFocus: true,
    onInput (value) {
      setValue(value)
      setHasResult(false)

      setSearchString(value)
    },
    onReset () {
      onReset()
      clearSuggestions()

      setValue('')
      setHasResult(false)
    },
    onResult (result) {
      onResult(result)
      clearSuggestions()

      setValue(result.label)
      setHasResult(true)
    }
  }
}

export default useDefaultSearchProps
