import React from 'react'
import PropTypes from 'prop-types'
import _ from './Slide.module.sass'

export default function Slide ({ feature }) {
  return <div className={_.content}>
    <h2 className={_.title}>{feature.properties.title}</h2>
    <p className={_.description}>{feature.properties.description}</p>
  </div>
}

Slide.propTypes = {
  feature: PropTypes.shape({
    properties: PropTypes.object.isRequired
  }).isRequired
}
