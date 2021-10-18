import React from 'react';
import useFuseJsSearch from '../hooks/useFuseJsSearch';
import useDropdownSearchProps from '../hooks/useDropdownSearchProps';

import SearchInput from '../../SearchInput/SearchInput';
import { FuseOptions } from 'fuse.js';

export interface DropdownSearchProps<T> {
  list: T[];
  limit?: number;
  fuseOptions?: FuseOptions<T>;
  format: (suggestion: T) => string;
  onResult: (result: T) => void;
  placeholder?: string;
}

/**
 * This is a basic example of how to use the search SearchInput component as dropdown
 * you can use this as is – or as an example for creating your own search
 */
const DropdownSearch = <T extends unknown>({
  list,
  limit = 10,
  fuseOptions,
  format,
  onResult,
  placeholder,
}: DropdownSearchProps<T>) => {
  const { suggestions, setSearchString } = useFuseJsSearch(list, limit, {
    ...fuseOptions,
    returnAllOnEmptyString: true,
  });
  const searchProps = useDropdownSearchProps({
    suggestions,
    setSearchString,
    format,
    onResult,
  });

  return <SearchInput {...searchProps} placeholder={placeholder} />;
};

export default DropdownSearch;
