import React, { useState } from 'react'
import PropTypes from 'prop-types'
import searchIcon from './img/searchIcon.svg'
import closeIcon from './img/closeIcon.svg'
import dropdownIcon from './img/dropdownIcon.svg'
import styles from './SearchInput.module.sass'

const DropdownButton = props => {
  const { showResetState, onClick } = props

  return !showResetState
    ? <button key='dropdown' className={styles.searchButton} onClick={onClick}>
      <img src={dropdownIcon} className={styles.dropdown} />
    </button>
    : <button key='reset' className={styles.searchButton} type={'reset'}>
      <img src={closeIcon} />
    </button>
}

DropdownButton.propTypes = {
  showResetState: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

const SearchButton = ({ showResetState }) => {
  return showResetState
    ? <button key='reset' className={styles.searchButton} type={'reset'}>
      <img src={closeIcon} />
    </button>
    : <button key='submit' className={styles.searchButton} type={'submit'}>
      <img src={searchIcon} />
    </button>
}

SearchButton.propTypes = {
  showResetState: PropTypes.bool.isRequired
}

const SearchInput = props => {
  const {
    className,
    asDropdown,
    placeholder, nothingFoundText,
    suggestions,
    onReset, onResult, onInput } = props

  const [text, setText] = useState('')
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(0)
  const nothingFound = suggestions && suggestions.length === 0
  const wrapperClassName = `${className} ${styles.searchWrapper}`

  function handleReset () {
    setText('')
    onReset()
  }

  function handleSubmit (e) {
    e.preventDefault()
    const result = (suggestions && suggestions[highlightedSuggestion])
    if (result) {
      setText(result.label)
      onResult(result.value)
    }
  }

  function handleInput (e) {
    e.preventDefault()
    const { target: { value } } = e
    setText(value)
    onInput(value)
  }

  function handleFocus (e) {
    this.handleInput(e)
    this.inputElement.focus()
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
          ref={elem => { this.inputElement = elem }}
          type='text'
          placeholder={placeholder}
          value={text}
          onInput={handleInput}
          onFocus={handleFocus}
          autoComplete={'off'} />

        {asDropdown
          ? <DropdownButton showResetState={suggestions !== null} onClick={handleReset} />
          : <SearchButton showResetState={false} />
        }
      </form>

      {suggestions &&
        <ul className={styles.resultList}>
          {suggestions.map((suggestion, i) =>
            <li
              onClick={onResult(suggestion.value)}
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
  /** Input can be used as dropdown
      this only alters the search button:
   - *when asDropdown is `false`:*
     button will show a search icon
     button click will call onResult function with the highlighted suggestion

   - *when asDropdown is `true`:*
     button will show a triangle
     button click will focus input and call onInput with ''

   */
  asDropdown: PropTypes.bool,
  placeholder: PropTypes.string,
  /** text shown when suggestions are an empty array */
  nothingFoundText: PropTypes.string,
  /** list of possible results that can be selected by the user */
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
  asDropdown: false,
  placeholder: '',
  nothingFoundText: 'Nichts gefunden',
  suggestions: null,
  selectedResult: null,
  onReset: () => {},
  onResult: () => {},
  onInput: () => {}
}

export default SearchInput
