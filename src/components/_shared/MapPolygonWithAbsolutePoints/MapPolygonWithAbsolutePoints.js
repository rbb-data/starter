import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Polygon, withLeaflet } from 'react-leaflet'

/**
 * anything you can pass to [`Path`](http://leafletjs.com/reference-1.3.0.html#path)
 * can also be passed to this polygon
 *
 * This component uses the [`map` context of react leaflet](https://react-leaflet.js.org/docs/en/intro.html#component-context)
 * and therefore needs to be a child or some grandchild of [`<Map>`](https://react-leaflet.js.org/docs/en/components.html#map)
*/
class MapPolygonWithAbsolutePoints extends Component {
  static propTypes = {
    /**  An array of functions that take the parameters `{ width, height }` and must return an object with numbers for `{ x, y } */
    pointCalculationFunctions: PropTypes.arrayOf(PropTypes.func).isRequired,
    positionsOnMap: PropTypes.array.isRequired
  }

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
