import { useState } from 'react'

function useDefaultSearchProps ({ suggestions, setSearchString, onReset, onResult }) {
  const [value, setValue] = useState('')
  const [hasResult, setHasResult] = useState(false)
  const showCancel = hasResult || (suggestions && suggestions.length === 0)

  return {
    value: value,
    suggestions: suggestions,
    buttonType: showCancel ? 'cancel' : 'search',
    keepInputOnFocus: true,
    onInput (value) {
      // update internal state
      setValue(value)
      setHasResult(false)

      // calll external handlers
      setSearchString(value)
    },
    onReset () {
      // update internal state
      setValue('')
      setHasResult(false)

      // calll external handlers
      setSearchString(null)
      onReset()
    },
    onResult (result) {
      // update internal state
      setValue(result.label)
      setHasResult(true)

      // calll external handlers
      setSearchString(null)
      onResult(result)
    }
  }
}

export default useDefaultSearchProps
