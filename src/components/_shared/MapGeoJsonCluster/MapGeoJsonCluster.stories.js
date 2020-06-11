import React from 'react'
import Map from '../Map/Map'
import MapGeoJsonCluster from './MapGeoJsonCluster'
import geojson from './features.geo.json'

export default {
  title: 'II Components/Map/MapGeoJsonCluster',
  component: MapGeoJsonCluster,
}

export const Basic = () => (
  <Map>
    <MapGeoJsonCluster
      features={geojson.features}
      chunkedLoading
      chunkInterval={100}
      maxClusterRadius={6}
      zoomToBoundsOnClick={false}
      showCoverageOnHover={false}
      spiderfyOnMaxZoom={false}
      disableClusteringAtZoom={14}
    />
  </Map>
)
