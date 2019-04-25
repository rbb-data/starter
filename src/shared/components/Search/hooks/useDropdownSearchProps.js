import { useState } from 'react'

function useDropdownSearchProps ({ suggestions, setSearchString, onResult }) {
  const [value, setValue] = useState('')
  const [lastResult, setLastResult] = useState(null)

  return {
    value: value,
    suggestions: suggestions,
    buttonType: suggestions === null ? 'dropdown' : 'cancel',
    onInput (value) {
      // update internal state
      setValue(value)

      // calll external handlers
      setSearchString(value)
    },
    onReset () {
      // update internal state
      setValue(lastResult)

      // calll external handlers
      setSearchString(null)
    },
    onResult (result) {
      // update internal state
      setLastResult(result.label)
      setValue(result.label)

      // calll external handlers
      setSearchString(null)
      onResult(result)
    }
  }
}

export default useDropdownSearchProps
