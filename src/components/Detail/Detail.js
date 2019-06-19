import React from 'react'
import Slider from '../../shared/components/Slider/Slider'
import _ from './Detail.module.sass'

function Slide ({ feature }) {
  if (!feature) return null

  return <div className={_.content}>
    <h2 className={_.title}>{feature.properties.title}</h2>
    <p className={_.description}>{feature.properties.description}</p>
  </div>
}

export default function Detail (props) {
  const { className } = props

  return <div className={className}>
    <Slider>
      {() => <Slide />}
      {() => <Slide />}
      {() => <Slide />}
    </Slider>
  </div>
}
