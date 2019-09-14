import React, { useReducer, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { MapLayer, useLeaflet, withLeaflet } from 'react-leaflet'
import L from 'leaflet'

function safeRemoveLayer (leafletMap, el) {
  const { overlayPane } = leafletMap.getPanes()
  if (overlayPane && overlayPane.contains(el)) {
    overlayPane.removeChild(el)
  }
}

function useForceUpdate () {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  return forceUpdate
}

function SVG (props) {
  // eslint-disable-next-line react/prop-types
  const { children: renderFunction } = props
  const { map } = useLeaflet()
  const svgRef = useRef(null)
  const forceUpdate = useForceUpdate()

  const zoomClass = 'leaflet-zoom-hide'

  useEffect(() => {
    const updateMapState = e => {
      const topLeft = map.containerPointToLayerPoint([0, 0])
      L.DomUtil.setPosition(svgRef.current, topLeft)
      // make shure to rerender for current map state
      forceUpdate()
    }

    map.on('moveend', updateMapState)
    return () => { map.off('moveend', updateMapState) }
  }, [map])

  const mapSize = map.getSize()

  return <svg
    ref={svgRef}
    className={zoomClass}
    width={mapSize.x}
    height={mapSize.y}>
    {renderFunction(map)}
  </svg>
}

/**
 * allows to render a svg with a fixed position over the map
 * @extends MapLayer
 * @param props.children {(map) => {}} takes a render function as a single child
 *  this function is called every time the zoom or position of the map changes so
 *  the content of the svg can be updated accordingly
 */
class MapSVGLayer extends MapLayer {
  createLeafletElement (props) {
    this.el = L.DomUtil.create('div')

    const SVGLayer = L.Layer.extend({
      getAttribution: () => props.attribution,
      onAdd: (leafletMap) => {
        leafletMap.getPanes().markerPane.appendChild(this.el)
      },
      addTo: (leafletMap) => {
        leafletMap.addLayer(this)
        return this
      },
      onRemove: (leafletMap) => {
        safeRemoveLayer(leafletMap, this.el)
      }
    })

    return new SVGLayer()
  }

  render () {
    const { children: renderFunction } = this.props
    return ReactDOM.createPortal(<SVG>{renderFunction}</SVG>, this.el)
  }
}

export default withLeaflet(MapSVGLayer)
