/* eslint-env browser */
import style from './styles.sass'

import React, { Component } from  'react'
import { PropTypes } from 'preact-compat'
import { autocomplete } from '../../lib/opencage.js'
import searchIcon from './img/searchIcon.svg'
import closeIcon from './img/closeIcon.svg'

function featureLabel (feature) {
  return `${feature.formatted}`
}

/** @deprecated */
export default class Search extends Component {
  static defaultProps = {
    isOnSmallScreen: false,
    placeholder: 'Bitte Adresse eingeben',
    location: 'berlin',
    onSelect: () => {},
    geojsonSearch: () => []
  }

  propTypes = {
    class: PropTypes.string,
    layers: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelect: PropTypes.func
  }

  constructor ({ onSelect, isOnSmallScreen }) {
    super()
    this.state = {
      // value of the text input
      value: '',
      // selected input feature
      result: undefined,
      // displayed suggestions (e.g. autocomplete results)
      suggestions: undefined,
      // currently selected
      highlightedSuggestion: 0,
      // the input field is hidden on mobile
      inputVisible: !isOnSmallScreen
    }
  }

  handleAutoCompleteResponse = (provider, geojsonFeatures) => {
    const features = geojsonFeatures
      .concat(provider.features)
      .map((feature) => {
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
              .filter(({components: {_type}}) =>
                _type === 'road' ||
                _type === 'neighbourhood' ||
                _type === 'building')
              .map(entry => ({
                ...entry,
                type: 'location',
                location: {
                  lat: entry.geometry.lat,
                  lng: entry.geometry.lng
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
    this.setState({
      value: feature.properties.label,
      result: feature,
      suggestions: undefined,
      highlightedSuggestion: 0
    }, () => {
      this.blockBlurEvent = false
      this.props.onSelect(feature)
    })
  }

  handleResultSelect = (feature) => () => { this.setResult(feature) }

  //
  // Autocomplete user interface (key interaction etc.)
  //

  handleKeyDown = (e) => {
    const { suggestions, highlightedSuggestion } = this.state

    // if we don't have any suggestions we don't need to change behavior
    if (suggestions === undefined) return

    // ArrowUP / ArrowDown key pressed (UP / Down in IE)
    const keyIsArrowUp = e.key === 'ArrowUp' || e.key === 'Up'
    const keyIsArrowDown = e.key === 'ArrowDown' || e.key === 'Down'

    if (!keyIsArrowUp && !keyIsArrowDown) return

    // move highlighted suggestion one down and stay at bottom or move
    // highlighted suggestion one up and stay at top
    const newHighlight = keyIsArrowDown
      ? highlightedSuggestion + 1
      : highlightedSuggestion - 1

    this.setState({
      highlightedSuggestion: Math.max(
        Math.min(newHighlight, suggestions.length - 1), 0
      )
    })
  }

  handleBlur = () => {
    // this is very hacky, but it's necessary. the problem basically is this:
    // if you have a suggestion list and you want to select something, the blur
    // event on the input field is fired before the click event on an item in
    // that list. this callback handles this blur event
    if (this.state.suggestions == null) {
      // here we can do it without any kind of delay because
      // it's not possible to fire a click event
      this.setState({ inputVisible: !this.props.isOnSmallScreen })
    } else {
      // this functionality is bascially to space out hiding everything
      // long enough to interfer with the click event
      setTimeout(() => {
        if (this.state.result != null) return
        this.setState({
          value: '',
          suggestions: undefined,
          inputVisible: !this.props.isOnSmallScreen
        })
      }, 1000)
    }
  }

  handleReset = () => {
    this.setState({ value: '', result: undefined })
    this.props.onSelect()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.inputVisible || !this.props.isOnSmallScreen) {
      const {result, suggestions, highlightedSuggestion} = this.state

      // if the user submits twice suggestions will be undefined but the result
      // from the last submit is stored so we can use it
      const feature = result || (suggestions && suggestions[highlightedSuggestion])
      if (feature) this.setResult(feature)
    } else {
      this.setState({ inputVisible: true })
      this.inputElement.focus()
    }
  }

  render (props, state) {
    const {class: className, layers} = props
    const {value, result, suggestions, highlightedSuggestion} = state
    const nothingFound = suggestions && suggestions.length === 0

    const visibility = show => ({ display: show ? 'block' : 'none' })

    return (<div className={`${className} ${style.addressSearch}`}>
      <div class={`${style.searchWrapper} ${state.inputVisible ? style.inputVisible : ''}`}>
        <form onSubmit={this.handleSubmit} onReset={this.handleReset} onKeyDown={this.handleKeyDown}>
          <input
            ref={elem => { this.inputElement = elem }}
            type='text'
            placeholder={props.placeholder}
            value={value}
            onInput={this.handleInput(layers)}
            onBlur={this.handleBlur}
            autoComplete={'off'} />
          <button class={style.searchButton} type={'reset'} style={visibility(result)}>
            <img src={closeIcon} />
          </button>
          <button class={style.searchButton} type={'submit'} style={visibility(!result)}>
            <img src={searchIcon} />
          </button>
        </form>
        {suggestions &&
          <ul className={style.resultList}>
            {suggestions.map((feature, i) =>
              <li
                onClick={this.handleResultSelect(feature)}
                className={highlightedSuggestion === i ? style.active : ''}>
                <p className={style.inner}>{feature.properties.label}</p>
              </li>)
            }
          </ul>
        }
        {nothingFound &&
          <p class={style.nothingFound}>Die Adresse konnte nicht gefunden werden.</p>
        }
      </div>
      <div class={style.infoWrapper}>
        <button class={style.infoButton} onClick={this.toggleInfoText}>i</button>
        <div class={style.infoBox}>
          Bei Nutzung der Suchfunktion werden Daten an <a target='_blank' href='https://geocoder.opencagedata.com/'>OpenCage</a> übertragen.
          Weitere Informationen auf der rbb <a target='_blank' href='https://www.rbb-online.de/hilfe/copyright_und_datenschutz/datenschutzerklaerung.html'>
          Datenschutzerklärung</a>.
        </div>
      </div>
    </div>)
  }
}
