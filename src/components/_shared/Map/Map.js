import React from 'react'
import PropTypes from 'prop-types'
import 'leaflet/dist/leaflet.css'
import { Map as LeafletMap, ZoomControl, GeoJSON } from 'react-leaflet'
import { BingLayer } from 'react-leaflet-bing'

import trackEvent from 'lib/analytics'
import berlinMask from 'data/berlin-mask.geo.json'
import berlinBoroughs from 'data/berlin-bezirke.geo.json'
import { darkGrey } from 'global_styles/colors.sass'
import _ from './Map.module.sass'

// TODO:
// add brandenburg as option
// add Potsdam as option

/**
 * React leaflet map component in rbb-data style
 * with bing map tiles and berlin borders
 */
const Map = props => {
  const { children, className, bingKey, ...forwardedProps } = props

  function handleZoom (e) {
    const map = e.target
    map.dragging.enable()
    if (map.tap) map.tap.enable()
    trackEvent('zoom map')
  }

  function handleDragEnd (e) {
    trackEvent('move map')
  }

  // props used for initial map rendering
  const berlin = {
    center: { lat: 52.5244, lng: 13.4105 },
    bounds: {
      topleft: { lat: 52.65, lng: 13.1 },
      bottomright: { lat: 52.35, lng: 13.75 }
    },
    maxBounds: {
      topleft: { lat: 52.8, lng: 12.9 },
      bottomright: { lat: 52.2, lng: 13.9 }
    }
  }

  const mapProps = {
    animate: false,
    // this is false because ios jumps towards elemts that can have focus when you touch
    // them which makes the page jump
    keyboard: false,
    minZoom: 9,
    maxZoom: 17,
    zoomControl: false,
    scrollWheelZoom: false,
    dragging: false,
    onZoom: handleZoom,
    onDragEnd: handleDragEnd,
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

  // const mapStyle = 'trs|lv:true;fc:EAEAEA_pp|lv:false;v:false_ar|v:false;lv:false_vg|v:true;fc:E4E4E4_wt|fc:AED1E4_rd|sc:d0d0d0;fc:e9e9e9;lv:false_mr|sc:d3d3d3;fc:dddddd;lv:true_hg|sc:d3d3d3;fc:e9e9e9;lv:true_g|lc:EAEAEA'
  // const darkStyle = 'trs|lv:true_pp|lv:false;v:false_ar|v:false;lv:false_vg|v:true_wt|lv:false_wt|fc:0B2539_rd|lv:false_mr|lv:true_hg|lv:false'
  const beigeStyle = 'trs|lv:true;fc:dfded2_pp|lv:false;v:false_ar|v:false;lv:false_vg|v:true_wt|lv:false;fc:86c6ed_rd|fc:ECEADD;sc:D4CDB9;lv:false_mr|fc:ECEADD;lv:true_hg|lv:false_g|lc:dfded2'
  const mapClassName = `${className} ${_.map}`

  return <LeafletMap className={mapClassName} {...mapProps} {...forwardedProps}>
    <BingLayer
      type='CanvasGray'
      bingkey={bingKey}
      culture='de-de'
      // eslint-disable-next-line react/style-prop-object
      style={beigeStyle} />

    <GeoJSON
      data={berlinMask}
      interactive={false}
      fillOpacity={0.8}
      color='white'
      stroke={false} />

    <GeoJSON
      data={berlinBoroughs}
      interactive={false}
      opacity={1}
      weight={0.3}
      fillOpacity={0}
      color={darkGrey} />

    {/* <Rectangle bounds={mapProps.bounds} /> */}

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
