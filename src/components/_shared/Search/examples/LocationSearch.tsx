import React from 'react';
import useOpenrouteservice, { format } from '../hooks/useOpenrouteservice';
import useDefaultSearchProps from '../hooks/useDefaultSearchProps';

import SearchInput from '../../SearchInput/SearchInput';

type Layer =
  | 'venue'
  | 'street'
  | 'address'
  | 'neighbourhood'
  | 'borough'
  | 'localadmin'
  | 'locality'
  | 'county'
  | 'macrocounty'
  | 'region'
  | 'macroregion'
  | 'country'
  | 'coarse';

type Source = 'openstreetmap' | 'openaddresses' | 'whosonfirst' | 'geonames';

export interface OpenrouteConfig {
  location: 'berlin' | 'brandenburg';
  layers: Layer[];
  sources: Source[];
}

export interface LocationSearchProps<T> {
  /** see: https://openrouteservice.org/dev/#/api-docs/geocode/autocomplete/get */
  openrouteConfig?: OpenrouteConfig;
  keepInputOnFocus?: boolean;
  onResult: (result: T) => void;
  onReset: () => void;
  placeholder?: string;
}

const defaultOpenrouteConfig: OpenrouteConfig = {
  location: 'berlin',
  layers: ['street'],
  sources: ['openstreetmap'],
};

/**
 * This is a basic example of how to use the SearchInput component with Openrouteservice
 * you can use this as is – or as an example for creating your own search
 */
const LocationSearch = <T extends unknown>({
  openrouteConfig = defaultOpenrouteConfig,
  keepInputOnFocus = true,
  onResult,
  onReset,
  placeholder,
}: LocationSearchProps<T>) => {
  const { suggestions, setSearchString } = useOpenrouteservice(openrouteConfig);
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

export default LocationSearch;
