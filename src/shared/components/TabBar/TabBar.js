import React from 'react'
import PropTypes from 'prop-types'
import styles from './TabBar.module.sass'

/**
 * Renders selectable Tabs next to each other
 */
const TabBar = props => {
  const { id, tabs, title, selectedValue, onSelect, className } = props

  return <div className={`${styles.radioFilter} ${className}`}>
    <ul title={title}>
      { tabs.map((option, i) =>
        <li className={option.value === selectedValue && styles.active}>
          <input
            key={`${id}-${i}`}
            id={`${id}-${i}`}
            type='radio'
            name={id}
            value={option.value}
            checked={option.value === selectedValue}
            onChange={e => onSelect(e.target.value)} />

          <label
            key={`${id}-${i}`}
            htmlFor={`${id}-${i}`}
            style={{ backgroundColor: option.color }}>

            { option.display }
          </label>
        </li>
      )}
    </ul>
  </div>
}

TabBar.propTypes = {
  /** needs to be uniqe in the document */
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  /** An array of objects like this: { value: 0, display: 'tab1' } */
  tabs: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    display: PropTypes.node.isRequired
  })).isRequired,
  selectedValue: PropTypes.any.isRequired,
  /** select handler */
  onSelect: PropTypes.func
}

TabBar.defaultProps = {
  onSelect: () => {}
}

export default TabBar
