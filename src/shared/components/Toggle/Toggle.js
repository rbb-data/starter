import React from 'react'
import PropTypes from 'prop-types'
import _ from './Toggle.module.sass'

const Toggle = props => {
  const { a, b, active, style, name, onChange } = props

  const handleChange = e => { onChange(e.target.value) }

  return <div className={_.scenarioToggler} style={style}>
    <span>
      <input
        type='radio'
        checked={active === a.value}
        onChange={handleChange}
        value={a.value}
        name={`${name}_scenario`}
        id={`${name}_scenario-rcp8.5`} />
      <label className={_.eightFive} htmlFor={`${name}_scenario-rcp8.5`}>
        {a.label}
      </label>
    </span>
    <span>
      <input
        type='radio'
        checked={active === b.value}
        onChange={handleChange}
        value={b.value}
        name={`${name}_scenario`}
        id={`${name}_scenario-rcp2.6`} />
      <label className={_.twoSix} htmlFor={`${name}_scenario-rcp2.6`}>
        {b.label}
      </label>
    </span>
  </div>
}

Toggle.propTypes = {
  a: PropTypes.shape({ value: PropTypes.any.isRequired, label: PropTypes.node.isRequired }),
  b: PropTypes.shape({ value: PropTypes.any.isRequired, label: PropTypes.node.isRequired }),
  active: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
  onChange: PropTypes.func
}

Toggle.defaultProps = {
  onChange: Function.prototype
}
export default Toggle
