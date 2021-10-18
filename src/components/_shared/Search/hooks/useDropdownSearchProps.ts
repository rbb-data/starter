import { useState } from 'react';

function useDropdownSearchProps({
  suggestions,
  setSearchString,
  format,
  onResult,
}) {
  const [value, setValue] = useState('');
  const [lastResult, setLastResult] = useState(null);

  return {
    value: value,
    suggestions: suggestions,
    buttonType: suggestions === null ? 'dropdown' : 'cancel',
    format: format,
    onInput(value) {
      // update internal state
      setValue(value);

      // call external handlers
      setSearchString(value);
    },
    onReset() {
      // update internal state
      setValue(lastResult);

      // call external handlers
      setSearchString(null);
    },
    onResult(result) {
      // update internal state
      setLastResult(format(result));
      setValue(format(result));

      // call external handlers
      setSearchString(null);
      onResult(result);
    },
  };
}

export default useDropdownSearchProps;
