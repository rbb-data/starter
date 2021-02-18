import React, { ReactNode } from 'react'
import useFuseJsSearch from '../hooks/useFuseJsSearch'
import useDropdownSearchProps from '../hooks/useDropdownSearchProps'

import SearchInput from '../../SearchInput/SearchInput'
import { FuseOptions } from 'fuse.js'

export interface DropdownSearchWithReactNodesProps<T> {
  list: T[]
  limit?: number
  fuseOptions?: FuseOptions<T>
  formatString: (result: T) => string
  formatNode: (suggestion: T) => ReactNode
  onResult: (result: T) => void
  placeholder?: string
}

/**
 * This is a basic example of how to customize the search
 */
const DropdownSearchWithReactNodes = <T extends unknown>({
  list,
  limit = 10,
  fuseOptions,
  formatString,
  formatNode,
  onResult,
  placeholder,
}: DropdownSearchWithReactNodesProps<T>) => {
  const { suggestions, setSearchString } = useFuseJsSearch(list, limit, {
    ...fuseOptions,
    returnAllOnEmptyString: true,
  })

  const dropdownSearchProps = useDropdownSearchProps({
    suggestions,
    setSearchString,
    // useDropdownSearchProps expects `format` to return a string
    format: formatString,
    onResult,
  })

  // set our own format prop not the one useDropdownSearchProps uses
  const searchProps = {
    ...dropdownSearchProps,
    format: formatNode,
  }

  return <SearchInput {...searchProps} placeholder={placeholder} />
}

export default DropdownSearchWithReactNodes
