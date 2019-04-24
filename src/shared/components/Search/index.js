/* eslint-env browser */
import style from './styles.sass'

import React, { Component } from 'react'
import searchIcon from './img/searchIcon.svg'
import closeIcon from './img/closeIcon.svg'
import dropdownIcon from './img/dropdownIcon.svg'

import InfoBox from '../InfoBox'

export default class Search extends Component {
  static defaultProps = {
    isOnSmallScreen: false,
    asDropdown: false,
    placeholder: 'Bitte Adresse eingeben',
    nothingFoundText: 'Die Adresse konnte nicht gefunden werden.',
    // displayed suggestions (e.g. autocomplete results)
    suggestions: null,
    // selected input feature
    selectedResult: null,
    onInput: (value) => {},
    onResult: (result) => {},
    onReset: () => {}
  }

  state = {
    // value of the text input
    value: '',
    // currently selected
    highlightedSuggestion: 0,
    // the input field can be hidden e.g. on mobile
    inputVisible: true
  }

  handleInput = (e) => {
    e.preventDefault()
    const { target: {value} } = e
    this.setState({ value })
    this.props.onInput(value)
  }

  handleFocus = (e) => {
    this.handleInput(e)
    this.inputElement.focus()
  }

  handleResultSelect = (value) => () => {
    this.props.onResult(value)
  }

  //
  // Autocomplete user interface (key interaction etc.)
  //

  handleKeyDown = (e) => {
    const { highlightedSuggestion } = this.state
    const { suggestions } = this.props

    // if we don't have any suggestions we don't need to change behavior
    if (suggestions === null) return

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

  // handleBlur = () => {
  //   const { selectedResult, suggestions, isOnSmallScreen } = this.props
  //   // this is very hacky, but it's necessary. the problem basically is this:
  //   // if you have a suggestion list and you want to select something, the blur
  //   // event on the input field is fired before the click event on an item in
  //   // that list. this callback handles this blur event
  //   if (suggestions === null) {
  //     // here we can do it without any kind of delay because
  //     // it's not possible to fire a click event
  //     this.setState({ inputVisible: !this.props.isOnSmallScreen })
  //     this.props.onReset()
  //   } else {
  //     // this functionality is bascially to space out hiding everything
  //     // long enough to interfer with the click event
  //     setTimeout(() => {
  //       if (selectedResult !== null) return
  //       this.props.onReset()
  //       this.setState({
  //         value: '',
  //         inputVisible: !isOnSmallScreen
  //       })
  //     }, 1000)
  //   }
  // }

  handleReset = () => {
    this.setState({ value: '', previousResult: null })
    this.props.onReset()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.inputVisible || !this.props.isOnSmallScreen) {
      const { suggestions } = this.props
      const { previousResult, highlightedSuggestion } = this.state

      // if the user submits twice suggestions will be undefined but the result
      // from the last submit is stored so we can use it
      const result = (suggestions && suggestions[highlightedSuggestion]) || previousResult
      this.previousResult = result
      if (result) this.props.onResult(result.value)
    } else {
      // if input was hidden the event on the submit button will show the
      // search input
      this.setState({ inputVisible: true })
      this.inputElement.focus()
    }
  }

  getButton = () => {
    const { asDropdown, suggestions, selectedResult } = this.props

    if (asDropdown) {
      return suggestions === null
        ? <button key='dropdown' class={style.searchButton} onClick={this.handleFocus}>
          <img src={dropdownIcon} class={style.dropdown} />
        </button>
        : <button key='reset' class={style.searchButton} type={'reset'}>
          <img src={closeIcon} />
        </button>
    } else {
      return selectedResult
        ? <button key='reset' class={style.searchButton} type={'reset'}>
          <img src={closeIcon} />
        </button>
        : <button key='submit' class={style.searchButton} type={'submit'}>
          <img src={searchIcon} />
        </button>
    }
  }

  render () {
    const { class: className, placeholder, nothingFoundText, suggestions } = this.props

    const { value, highlightedSuggestion, inputVisible } = this.state
    const nothingFound = suggestions && suggestions.length === 0

    return <div>
      <div class={`${className} ${style.searchWrapper} ${inputVisible ? style.inputVisible : ''}`}>
        <form onSubmit={this.handleSubmit} onReset={this.handleReset} onKeyDown={this.handleKeyDown}>
          <input
            ref={elem => { this.inputElement = elem }}
            type='text'
            placeholder={placeholder}
            value={value}
            onInput={this.handleInput}
            onFocus={this.handleFocus}
            // onBlur={this.handleBlur}
            autoComplete={'off'} />
          { this.getButton() }
        </form>
        {suggestions &&
          <ul className={style.resultList}>
            {suggestions.map((suggestion, i) =>
              <li
                onClick={this.handleResultSelect(suggestion.value)}
                className={highlightedSuggestion === i ? style.active : ''}>
                <div className={style.inner}>{suggestion.label}</div>
              </li>)
            }
          </ul>
        }
        {nothingFound &&
          <p class={style.nothingFound}>{ nothingFoundText }</p>
        }
      </div>
      <InfoBox />
    </div>
  }
}
