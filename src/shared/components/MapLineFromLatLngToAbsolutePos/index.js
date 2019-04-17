import React, { Component } from  'react'
import { Polyline } from 'react-leaflet'

export default class MapLineFromLatLngToAbsolutePos extends Component {
  constructor (props) {
    super(props)
    this.state = { point: null }
  }

  updateAbsPos = () => {
    const { top, bottom, left, right, usePercentValues = false } = this.props.position
    const bounds = this.context.map.getPixelBounds()
    let x, y
    if (usePercentValues) {
      const diffX = bounds.max.x - bounds.min.x
      const diffY = bounds.max.y - bounds.min.y
      x = bounds.min.x + diffX * left || bounds.max.x - diffX * right || bounds.min.x
      y = bounds.min.y + diffY * top || bounds.max.y - diffY * bottom || bounds.min.y
    } else {
      x = bounds.min.x + left || bounds.max.x - right || bounds.min.x
      y = bounds.min.y + top || bounds.max.y - bottom || bounds.min.y
    }
    this.setState({ point: this.context.map.unproject([x, y]) })
  }

  componentDidMount () {
    this.updateAbsPos()
    this.context.map.on('move', e => { this.updateAbsPos() })
  }

  render (props) {
    const { latLng, positions: _, ...others } = props
    if (!this.state.point) return

    const positions = [
      [latLng.lat, latLng.lng],
      [this.state.point.lat, this.state.point.lng]
    ]

    return <Polyline positions={positions} {...others} />
  }
}
