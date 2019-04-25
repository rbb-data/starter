import { useState } from 'react'
import Fuse from 'fuse.js'

function useFuseJsSearch (allResults, options = {}) {
  const { returnAllOnEmptyString, ...fuseOptions } = options

  const searchOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['value'],
    ...fuseOptions
  }

  const [searchString, setSearchString] = useState(null)

  function getSuggestions () {
    if (searchString === null) return null
    if (searchString === '') return returnAllOnEmptyString ? allResults : null
    const fuse = new Fuse(allResults, searchOptions)
    return fuse.search(searchString)
  }

  const suggestions = getSuggestions()

  return { suggestions, setSearchString }
}

export default useFuseJsSearch
