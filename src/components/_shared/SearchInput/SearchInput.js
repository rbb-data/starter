import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import searchIcon from './img/searchIcon.svg'
import closeIcon from './img/closeIcon.svg'
import dropdownIcon from './img/dropdownIcon.svg'
import styles from './SearchInput.module.sass'

const SearchButton = ({ type, defaultAction }) => {
  switch (type) {
    default:
    case 'search':
      return <button key='submit' className={styles.searchButton} type={'submit'}>
        <img src={searchIcon} alt='search' />
      </button>
    case 'dropdown':
      return <button key='dropdown' className={styles.searchButton} onClick={defaultAction}>
        <img src={dropdownIcon} alt='show' className={styles.dropdown} />
      </button>
    case 'cancel':
      return <button key='reset' className={styles.searchButton} type={'reset'}>
        <img src={closeIcon} alt='reset' />
      </button>
  }
}

SearchButton.propTypes = {
  type: PropTypes.oneOf(['search', 'dropdown', 'cancel']).isRequired,
  defaultAction: PropTypes.func.isRequired
}

/**
 * SearchInput that can show a list of suggestions
 * This component provides no logic.
 * It just renders the search string and the provided result list
 * and provides event handlers for user actions
 */
const SearchInput = props => {
  const {
    className,
    buttonType,
    keepInputOnFocus,
    placeholder,
    nothingFoundText,
    suggestions,
    format,
    value,
    onReset,
    onBlur,
    onResult, 
    onInput
  } = props

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

    onInput(value)
    setHighlightedSuggestion(0)
  }

  function handleFocus (e) {
    if (keepInputOnFocus) {
      handleInput(e)
    } else {
      onInput('')
      setHighlightedSuggestion(0)
    }
    inputRef.current.focus()
  }

  function handleBlur () {
    onBlur()
    setHighlightedSuggestion(0)
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
          value={value}
          onInput={handleInput}
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete={'off'} />

        <SearchButton type={buttonType} defaultAction={handleFocus} />
      </form>

      {suggestions &&
        <ul className={styles.resultList}>
          {suggestions.map((suggestion, i) =>
            <li
              key={i}
              // this is needed to prevent the blur event on the input beeing called
              // before we select a suggestion. Becuase we might clear the suggestions
              // in the blur event and then a click would not be triggered
              onMouseDown={ e => e.preventDefault() }
              onClick={() => {
                setNewResult(suggestion)
                // if we did select a suggestion call blur afterwards
                inputRef.current.blur()
              }}
              className={highlightedSuggestion === i ? styles.active : ''}
            >
              <div className={styles.inner}>{format(suggestion)}</div>
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
  /** the value of the textinput */
  value: PropTypes.string,

  /** list of possible results that can be selected by the user
   *  set to `null` to show no suggestions and to `[]` to show nothingFound state
   */
  suggestions: PropTypes.array,

  /** You can set different button types that have different actions
   *
   * - search: magnifining class; when clicked calls onResult with the selected suggestion
   * - dropdown: triangle; when clicked focuses the input and calls onInput
   * - cancel: cross; when clicked clears the input and calls onReset
   */
  buttonType: PropTypes.oneOf(['search', 'dropdown', 'cancel']),

  keepInputOnFocus: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,

  /** text shown when suggestions are an empty array */
  nothingFoundText: PropTypes.string,

  /** used to format display of single suggestion
   * is passed the suggestion and should return a node
   */
  format: PropTypes.func,

  /** called when user clicks reset button */
  onReset: PropTypes.func,

  /** called when input field looses focus */
  onBlur: PropTypes.func,

  /** called when user selects a suggestion */
  onResult: PropTypes.func,

  /** called when text input changes */
  onInput: PropTypes.func
}

SearchInput.defaultProps = {
  value: '',
  buttonType: 'search',
  keepInputOnFocus: false,
  placeholder: '',
  nothingFoundText: 'Nichts gefunden',
  suggestions: null,
  selectedResult: null,
  format: value => value,
  onReset: () => {},
  onResult: () => {},
  onInput: () => {},
  onBlur: () => {}
}

export default SearchInput
