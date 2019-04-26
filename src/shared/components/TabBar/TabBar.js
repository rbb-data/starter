import React from 'react'
import PropTypes from 'prop-types'
import styles from './TabBar.module.sass'

/**
 * Renders selectable Tabs next to each other
 */
const TabBar = props => {
  const { id, tabs, title, selectedTab, format, color, onSelect, className } = props

  return <div className={`${styles.radioFilter} ${className}`}>
    <ul title={title}>
      { tabs.map((tab, i) =>
        <li className={tab === selectedTab && styles.active}>
          <input
            key={`${id}-${i}`}
            id={`${id}-${i}`}
            type='radio'
            name={id}
            value={tab}
            checked={tab === selectedTab}
            onChange={e => onSelect(e.target.value)} />

          <label key={`${id}-${i}`} htmlFor={`${id}-${i}`}>
            <span className={styles.slant} style={{ backgroundColor: color(tab) }} />
            { format(tab) }
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
  tabs: PropTypes.array.isRequired,
  selectedTab: PropTypes.any.isRequired,
  /** takes the tab value and should return its label
   *  (anything that can be renderd by react)
   */
  format: PropTypes.func,
  /** takes the tab value and should return its background color */
  color: PropTypes.func,
  /** select handler */
  onSelect: PropTypes.func
}

TabBar.defaultProps = {
  onSelect: () => {},
  format: value => value,
  color: () => null
}

export default TabBar
