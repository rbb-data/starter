import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import searchIcon from './img/searchIcon.svg'
import closeIcon from './img/closeIcon.svg'
import dropdownIcon from './img/dropdownIcon.svg'
import styles from './SearchInput.module.sass'

const SearchButton = ({ type, defaultAction }) => {
  switch (type) {
    case 'search':
      return <button key='submit' className={styles.searchButton} type={'submit'}>
        <img src={searchIcon} />
      </button>
    case 'dropdown':
      return <button key='dropdown' className={styles.searchButton} onClick={defaultAction}>
        <img src={dropdownIcon} className={styles.dropdown} />
      </button>
    case 'cancel':
      return <button key='reset' className={styles.searchButton} type={'reset'}>
        <img src={closeIcon} />
      </button>
  }
}

SearchButton.propTypes = {
  type: PropTypes.oneOf(['search', 'dropdown', 'cancel']).isRequired,
  defaultAction: PropTypes.func.isRequired
}

/**
 * SearchInput that can show a list of suggestions
 *
 */
const SearchInput = props => {
  const {
    className,
    buttonType, keepInputOnFocus,
    placeholder, nothingFoundText,
    suggestions,
    textInputValue,
    onReset, onResult, onInput } = props

  const [searchString, setSearchString] = useState('')
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(0)
  const inputRef = useRef()
  const nothingFound = suggestions && suggestions.length === 0
  const wrapperClassName = `${className} ${styles.searchWrapper}`

  function setNewResult (result) {
    if (!result) return

    setHighlightedSuggestion(0)
    onResult(result)
  }

  function handleReset () {
    setSearchString('')
    onReset()
    setHighlightedSuggestion(0)
  }

  function handleSubmit (e) {
    e.preventDefault()
    const newResult = (suggestions && suggestions[highlightedSuggestion])
    setNewResult(newResult)
  }

  function handleInput (e) {
    e.preventDefault()
    const { target: { value } } = e

    setSearchString(value)
    onInput(value)
    setHighlightedSuggestion(0)
  }

  function handleFocus (e) {
    if (keepInputOnFocus) {
      handleInput(e)
    } else {
      setSearchString('')
      onInput('')
      setHighlightedSuggestion(0)
    }
    inputRef.current.focus()
  }

  function handleKeyDown (e) {
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

    const saveNewHighlight = Math.max(Math.min(newHighlight, suggestions.length - 1), 0)
    setHighlightedSuggestion(saveNewHighlight)
  }

  return <div>
    <div className={wrapperClassName}>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        onKeyDown={handleKeyDown}>

        <input
          ref={inputRef}
          type='text'
          placeholder={placeholder}
          value={textInputValue || searchString}
          onInput={handleInput}
          onFocus={handleFocus}
          autoComplete={'off'} />

        <SearchButton type={buttonType} defaultAction={handleFocus} />
      </form>

      {suggestions &&
        <ul className={styles.resultList}>
          {suggestions.map((suggestion, i) =>
            <li
              key={i}
              onClick={() => { setNewResult(suggestion) }}
              className={highlightedSuggestion === i ? styles.active : ''}>
              <div className={styles.inner}>{suggestion.label}</div>
            </li>)
          }
        </ul>
      }
      {nothingFound &&
        <p className={styles.nothingFound}>{ nothingFoundText }</p>
      }
    </div>
  </div>
}

SearchInput.propTypes = {
  className: PropTypes.string,
  /** set the value of the textinput manually */
  textInputValue: PropTypes.string,
  /** You can set different button types that have different actions
   *
   * - search: magnifining class; when clicked calls onResult with the selected suggestion
   * - dropdown: triangle; when clicked focuses the input and calls onInput
   * - cancel: cross; when clicked clears the input and calls onReset
   */
  buttonType: PropTypes.oneOf(['search', 'dropdown', 'cancel']),
  keepInputOnFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  /** text shown when suggestions are an empty array */
  nothingFoundText: PropTypes.string,
  /** list of possible results that can be selected by the user
   *  set to `null` to show no suggestions and to `[]` to show nothingFound state
   */
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired
  })),
  /** called when user clicks reset button */
  onReset: PropTypes.func,
  /** called when user selects a suggestion */
  onResult: PropTypes.func,
  /** called when text input changes */
  onInput: PropTypes.func
}

SearchInput.defaultProps = {
  textInputValue: null,
  buttonType: 'search',
  keepInputOnFocus: false,
  placeholder: '',
  nothingFoundText: 'Nichts gefunden',
  suggestions: null,
  selectedResult: null,
  onReset: () => {},
  onResult: () => {},
  onInput: () => {}
}

export default SearchInput
