import React from 'react'
import PropTypes from 'prop-types'
import _ from './Toggle.module.sass'

const Toggle = props => {
  const { options, active, style, name, format, onChange } = props

  const handleChange = e => { onChange(e.target.value) }

  return <div className={_.scenarioToggler} style={style}>
    <span>
      <input
        type='radio'
        checked={active === options[0]}
        onChange={handleChange}
        value={options[0]}
        name={`${name}`}
        id={`${name}_${options[0]}`} />
      <label className={_.eightFive} htmlFor={`${name}_${options[0]}`}>
        {format(options[0])}
      </label>
    </span>
    <span>
      <input
        type='radio'
        checked={active === options[1]}
        onChange={handleChange}
        value={options[1]}
        name={`${name}`}
        id={`${name}_${options[1]}`} />
      <label className={_.twoSix} htmlFor={`${name}_${options[1]}`}>
        {format(options[1])}
      </label>
    </span>
  </div>
}

Toggle.propTypes = {
  options: PropTypes.array.isRequired,
  active: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
  /** customize option label - takes the option and should return a valid react node */
  format: PropTypes.func,
  onChange: PropTypes.func
}

Toggle.defaultProps = {
  format: value => value,
  onChange: Function.prototype
}
export default Toggle
