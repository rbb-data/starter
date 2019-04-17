import React, { Component } from 'react'
import { Polygon } from 'react-leaflet'

export default class MapPolygonWithAbsolutePoints extends Component {
  static defaultProps = {
    pointCalculationFunctions: [],
    positionsOnMap: []
  }

  constructor (props) {
    super(props)
    this.state = { positions: null }
  }

  updateAbsPos = () => {
    const { pointCalculationFunctions, positionsOnMap } = this.props
    const bounds = this.context.map.getPixelBounds()
    const width = bounds.max.x - bounds.min.x
    const height = bounds.max.y - bounds.min.y

    const unprojectedPoints = pointCalculationFunctions.map(getPoint => {
      const { x: xOffset, y: yOffset } = getPoint({ width, height })
      const x = bounds.min.x + xOffset
      const y = bounds.min.y + yOffset

      return this.context.map.unproject([x, y])
    })

    this.setState({ positions: [...unprojectedPoints, ...positionsOnMap] })
  }

  componentDidMount () {
    this.updateAbsPos()
    this.context.map.on('move', e => { this.updateAbsPos() })
  }

  componentDidUpdate (prevProps) {
    if (this.props !== prevProps) {
      this.updateAbsPos()
    }
  }

  render (props) {
    const { pointCalculationFunctions, positionsOnMap, ...others } = props
    if (!this.state.positions) return

    return <Polygon positions={this.state.positions} {...others} />
  }
}
