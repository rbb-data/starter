import React from 'react'
import PropTypes from 'prop-types'
import 'leaflet/dist/leaflet.css'
import { Map as LeafletMap, ZoomControl, GeoJSON } from 'react-leaflet'
import { BingLayer } from 'react-leaflet-bing'

import berlinMask from '../../data/berlin.geo.json'
import _ from './Map.module.sass'

/**
 * React leaflet map component in rbb-data style
 * with bing map tiles and berlin borders
 */
const Map = props => {
  const { children, className, bingKey } = props

  function handleZoom (e) {
    const map = e.target
    map.dragging.enable()
  }

  // props used for initial map rendering
  const berlin = {
    center: { lat: 52.5244, lng: 13.4105 },
    bounds: {
      topleft: { lat: 52.69, lng: 13.06 },
      bottomright: { lat: 52.32, lng: 13.79 }
    },
    maxBounds: {
      topleft: { lat: 52.8, lng: 12.9 },
      bottomright: { lat: 52.2, lng: 13.9 }
    }
  }

  const mapProps = {
    animate: true,
    // this is false because ios jumps towards elemts that can have focus when you touch
    // them which makes the page jump
    keyboard: false,
    minZoom: 9,
    maxZoom: 16,
    zoomControl: false,
    scrollWheelZoom: false,
    dragging: false,
    onZoom: handleZoom,
    zoomSnap: false,
    bounds: [
      [berlin.bounds.bottomright.lat, berlin.bounds.bottomright.lng],
      [berlin.bounds.topleft.lat, berlin.bounds.topleft.lng]
    ],
    maxBounds: [
      [berlin.maxBounds.bottomright.lat, berlin.maxBounds.bottomright.lng],
      [berlin.maxBounds.topleft.lat, berlin.maxBounds.topleft.lng]
    ]
  }

  const mapStyle = 'trs|lv:false;fc:EAEAEA_pp|lv:false;v:false_ar|v:false;lv:false_vg|v:true;fc:E4E4E4_wt|fc:AED1E4_rd|sc:d0d0d0;fc:e9e9e9_mr|sc:d3d3d3;fc:dddddd_hg|sc:d3d3d3;fc:e9e9e9_g|lc:EAEAEA'
  const mapClassName = `${className} ${_.map}`

  return <LeafletMap className={mapClassName} {...mapProps}>
    <BingLayer
      type='CanvasGray'
      bingkey={bingKey}
      culture='de-de'
      style={mapStyle} />

    <GeoJSON
      data={berlinMask}
      interactive={false}
      fillOpacity={0.8}
      color='white'
      stroke={false} />

    <ZoomControl position='bottomright' />

    {children}
  </LeafletMap>
}

Map.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  bingKey: PropTypes.string.isRequired
}

export default Map
