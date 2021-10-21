import React from 'react';
import Fuse from 'fuse.js';
import useFuseJsSearch from '../hooks/useFuseJsSearch';
import useDefaultSearchProps from '../hooks/useDefaultSearchProps';

import SearchInput from '../../SearchInput/SearchInput';

export interface SimpleSearchProps<T> {
  list: T[];
  /** see https://fusejs.io/api/options.html */
  fuseOptions: Fuse.IFuseOptions<T>;
  keepInputOnFocus?: boolean;
  format: (suggestion: T) => string;
  onResult: (result: T) => void;
  onReset: () => void;
  placeholder?: string;
  /** max number of results */
  limit?: number;
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
  limit,
}: SimpleSearchProps<T>) => {
  const { suggestions, setSearchString } = useFuseJsSearch(
    list,
    limit,
    fuseOptions
  );
  const searchProps = useDefaultSearchProps({
    suggestions,
    setSearchString,
    format,
    onReset,
    onResult,
  });

  return (
    <SearchInput
      {...searchProps}
      placeholder={placeholder}
      keepInputOnFocus={keepInputOnFocus}
    />
  );
};

export default SimpleSearch;
