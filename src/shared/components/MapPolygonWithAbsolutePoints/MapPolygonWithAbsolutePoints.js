import React, { Component } from 'react'
import { Polygon, withLeaflet } from 'react-leaflet'

class MapPolygonWithAbsolutePoints extends Component {
  static defaultProps = {
    pointCalculationFunctions: [],
    positionsOnMap: []
  }

  constructor (props) {
    super(props)
    this.state = { positions: null }
  }

  updateAbsPos = () => {
    const { pointCalculationFunctions, positionsOnMap, leaflet } = this.props
    const bounds = leaflet.map.getPixelBounds()
    const width = bounds.max.x - bounds.min.x
    const height = bounds.max.y - bounds.min.y

    const unprojectedPoints = pointCalculationFunctions.map(getPoint => {
      const { x: xOffset, y: yOffset } = getPoint({ width, height })
      const x = bounds.min.x + xOffset
      const y = bounds.min.y + yOffset

      return leaflet.map.unproject([x, y])
    })

    this.setState({ positions: [...unprojectedPoints, ...positionsOnMap] })
  }

  componentDidMount () {
    this.updateAbsPos()
    const { leaflet } = this.props
    leaflet.map.on('move', e => { this.updateAbsPos() })
  }

  componentDidUpdate (prevProps) {
    if (this.props !== prevProps) {
      this.updateAbsPos()
    }
  }

  render () {
    const { pointCalculationFunctions, positionsOnMap, ...others } = this.props
    if (!this.state.positions) return null

    return <Polygon positions={this.state.positions} {...others} />
  }
}

const Wrapped = withLeaflet(MapPolygonWithAbsolutePoints)

export default Wrapped
