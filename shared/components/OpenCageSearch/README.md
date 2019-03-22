# Search

Search input for looking up addresses or custom search queries

## Parameters

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| class | `String` | A className for the component | |
| isOnSmallScreen | `Boolean` | On small screens the input will be hidden behind a button | `false` |
| placeholder | `String` | The placeholder of the input field | `'Bitte Adresse eingeben'` |
| onSelect | `function` | Handler for when the user selects or clears a search result. Gets passed a result (see example) or nil when result is cleared | `() => {}` |
| geojsonSearch | `function` | gets a the search string as parameter and should return an array of geojson features. **The feature needs a property `formatted` which is what is displayed in the result list. Those features are also shown in the seach result | `() => { return [] }` |
| maxGeojsonResults | `Int` | Limit the number of visible geojsonSearch results | `3` |

## Example

**Code**

```jsx
const myGeoJson = { type: 'FeatureCollection', features: […] }

const handleSearch = result => {
  if (!result) {
    // result can be nil when query is cleared
    console.log('seach cleared')
  } else if (result.type === 'location') {
    // result can be a location provided by the geocoder
    console.log(result.location)
  } else if (result.type === 'feature') {
    // result can be a geojson feature returned by the custom search
    console.log(result.properties)
  }
  }
}

const customSearchFunction = value =>
  myGeoJson.features.filter(marker => {
    const markerName = marker.properties.name.toLowerCase()
    const markerNameMatchesValue = markerName.search(value.toLowerCase()) !== -1
    return markerNameMatchesValue
  })

const searchProps = {
  class: 'search-input'
  isOnSmallScreen: isOnSmallScreen,
  placeholder: 'Schulname oder Adresse...',
  onSelect: handleSearch
  geojsonSearch: customSearchFunction
  maxGeojsonResults: 5
}

<Search {...searchProps} />
```
