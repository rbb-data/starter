import { useState } from 'react';
import Fuse from 'fuse.js';

function useFuseJsSearch<T>(allResults: T[], limit = 10, options = {} as any) {
  const { returnAllOnEmptyString, ...fuseOptions } = options;

  const searchOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: ['value'],
    ...fuseOptions,
  };

  const [searchString, setSearchString] = useState(null);

  function getSuggestions() {
    if (searchString === null) return null;
    if (searchString === '') return returnAllOnEmptyString ? allResults : null;
    const fuse = new Fuse(allResults, searchOptions);
    return fuse
      .search(searchString, { limit })
      .map((suggestion) => suggestion.item);
  }

  const suggestions = getSuggestions();

  return { suggestions, setSearchString };
}

export default useFuseJsSearch;
