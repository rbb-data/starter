import React from 'react';
import useOpenrouteservice, {
  format as orFormat,
} from '../hooks/useOpenrouteservice';
import Fuse from 'fuse.js';
import useFuseJsSearch from '../hooks/useFuseJsSearch';
import useDefaultSearchProps from '../hooks/useDefaultSearchProps';

import SearchInput from '../../SearchInput/SearchInput';
import { OpenrouteConfig } from './LocationSearch';

export interface MixedSearchProps<T> {
  /** see: https://openrouteservice.org/dev/#/api-docs/geocode/autocomplete/get */
  openrouteConfig: OpenrouteConfig;
  fuseOptions: Fuse.IFuseOptions<T>;
  list: T[];
  format: (suggestion: T) => string;
  keepInputOnFocus: boolean;
  onResult: (result: T) => void;
  onReset: () => void;
  placeholder: string;
}

/**
 * This is a basic example of how to use the SearchInput component with Openrouteservice
 * you can use this as is – or as an example for creating your own search
 * This component thinks a result is from openrouteservice when it has the type location
 * so if you provide a list with objects that have { type: 'location' } your format function wont work
 */
const MixedSearch = (props) => {
  const {
    keepInputOnFocus,
    list,
    limit,
    format: fuseFormat,
    fuseOptions,
    openrouteConfig,
    onResult,
    onReset,
    placeholder,
  } = props;

  const {
    suggestions: fuseSuggestions,
    setSearchString: setFuseSearchString,
  } = useFuseJsSearch(list, limit, fuseOptions);
  const {
    suggestions: orSuggestions,
    setSearchString: setOrSearchString,
  } = useOpenrouteservice(openrouteConfig);
  const setSearchString = (searchString) => {
    setFuseSearchString(searchString);
    setOrSearchString(searchString);
  };

  const format = (result) => {
    if (result.type === 'location') return orFormat(result);
    return fuseFormat(result);
  };

  const suggestions =
    fuseSuggestions === null && orSuggestions === null
      ? null
      : [...(fuseSuggestions || []), ...(orSuggestions || [])];
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

MixedSearch.defaultProps = {
  openrouteConfig: { layers: ['street'], location: 'berlin', sources: ['osm'] },
  keepInputOnFocus: true,
  format: (value) => value,
};

export default MixedSearch;
