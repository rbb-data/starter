import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from './TabBar.module.sass'

export default class TabBar extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    id: PropTypes.string,
    options: PropTypes.array,
    title: PropTypes.string,
    selectedValue: PropTypes.any,
    className: PropTypes.string
  }

  constructor (props) {
    super(props)
    if (!this.props.onChange) this.props.onChange = ({ selectedValue }) => {}
  }

  select = e => {
    this.props.onChange({ selectedValue: e.target.value })
  }

  render () {
    const { id, options, title, selectedValue, className } = this.props

    return <div className={`${_.radioFilter} ${className}`}>
      <ul title={title}>
        { options.map((option, i) => <li className={option.value === selectedValue && _.active}>
          <input
            key={`${id}-${i}`}
            id={`${id}-${i}`}
            type='radio'
            name={id}
            value={option.value}
            checked={option.value === selectedValue}
            onChange={this.select} />

          <label
            key={`${id}-${i}`}
            htmlFor={`${id}-${i}`}
            style={{ backgroundColor: option.color }}>

            { option.display }
          </label>
        </li>)}
      </ul>
    </div>
  }
}
