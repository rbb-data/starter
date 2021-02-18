import React, { FunctionComponent } from 'react'
import useFuseJsSearch from '../hooks/useFuseJsSearch'
import useDefaultSearchProps from '../hooks/useDefaultSearchProps'

import SearchInput from '../../SearchInput/SearchInput'

export interface SimpleSearchProps<T> {
  list: T[]
  /** see https://fusejs.io/api/options.html */
  fuseOptions: any
  keepInputOnFocus?: boolean
  format: (suggestion: T) => string
  onResult: (result: T) => void
  onReset: (result: T) => void
  placeholder?: string
}
/**
 * This is a basic example of how to use the SearchInput component
 * you can use this as is – or as an example for creating your own search
 */
const SimpleSearch = <T extends unknown>({
  list,
  fuseOptions,
  keepInputOnFocus = true,
  format,
  onReset,
  onResult,
  placeholder,
}: SimpleSearchProps<T>) => {
  const { suggestions, setSearchString } = useFuseJsSearch(list, fuseOptions)
  const searchProps = useDefaultSearchProps({
    suggestions,
    setSearchString,
    format,
    onReset,
    onResult,
  })

  return (
    <SearchInput
      {...searchProps}
      placeholder={placeholder}
      keepInputOnFocus={keepInputOnFocus}
    />
  )
}

export default SimpleSearch
