/* eslint-env browser */
import style from './styles.sass'

import { h, Component } from 'preact'
import { PropTypes } from 'preact-compat'
import { autocomplete, fixBerlinSearchResult } from '../../lib/openrouteservice.js'
import searchIcon from './img/searchIcon.svg'
import closeIcon from './img/closeIcon.svg'

function featureLabel (feature) {
  return `${feature.formatted}`
}

export default class Search extends Component {


  handleAutoCompleteResponse = (provider, geojsonFeatures) => {
    const features = geojsonFeatures
      .concat(provider.features)
      .map((feature) => {
        feature = fixBerlinSearchResult(feature)
        return {
          // keep type and geometry
          ...feature,
          properties: {
            ...feature.properties,
            label: featureLabel(feature)
          }
        }
      })

    this.setState({
      suggestions: features,
      highlightedSuggestion: 0
    })
  }

  scheduledRequest = null
  debounceInMs = 1000

  /**
   * Handler for changes in our <input type='text' />, responsible for sending
   * the autocomplete queries.
   *
   * @param  {Array} layers Which layers to search for in autosuggestions.
   *                        See https://mapzen.com/documentation/search/autocomplete/#available-autocomplete-parameters
   * @return {function}     Event handler function that takes one param: e {InputEvent}
   */
  handleInput = (layers) => (e) => {
    e.preventDefault()
    const { target: {value} } = e
    if (this.state.value === value) return
    this.setState({ value, suggestions: undefined, result: undefined })
    this.props.onSelect()

    // cancel scheduled request and schedule a new one if our text field isn't empty
    clearTimeout(this.scheduledRequest)

    if (value.trim() !== '') {
      const request = () => {
        // search a provider engine for points matching the input
        const params = { layers: layers.join(','), text: value, location: this.props.location }
        const providerRequest = new Promise((resolve, reject) => {
          autocomplete(params).then(result => {
            result.features = result.features
              .map(entry => ({
                ...entry,
                type: 'location',
                location: {
                  lat: entry.geometry.coordinates[1],
                  lng: entry.geometry.coordinates[0]
                }
              }))
            resolve(result)
          })
        })

        // search the given features if a geojson search is provided in the properties
        const geojsonRequest = this.props.geojsonSearch(value)
          .slice(0, this.props.maxGeojsonResults || 3)
          .map(feature => ({
            ...feature,
            type: 'feature',
            formatted: feature.properties.formatted,
            location: {
              lat: feature.geometry.coordinates[1],
              lng: feature.geometry.coordinates[0]
            }
          }))

        Promise
          .all([providerRequest, geojsonRequest])
          .then(([providerResult, geojsonResult]) => {
            this.handleAutoCompleteResponse(providerResult, geojsonResult)
          })
      }

      // wait a delay before actual request to limit traffic
      this.scheduledRequest = setTimeout(request, this.debounceInMs)
    }
  }

  /**
   * Handle when a place is picked from our autocomplete results
   *
   * @param  {GeoJSON.Point} feature
   */
  setResult = (feature) => {
    let label = `${feature.properties.name}, ${feature.properties.neighbourhood ? `${feature.properties.neighbourhood},` : ''} ${feature.properties.region}`
    this.setState({
      value: label,
      result: feature,
      suggestions: undefined,
      highlightedSuggestion: 0
    }, () => {
      this.blockBlurEvent = false
      this.props.onSelect(feature)
    })
  }
