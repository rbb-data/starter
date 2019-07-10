import React from 'react'
import { storiesOf } from '@storybook/react'

import Map from '../Map/Map'
import MapGeoJsonCluster from './MapGeoJsonCluster'
import geojson from './features.geo.json'

storiesOf('MapGeoJsonCluster', module)
  .add('with default styles', () => {
    return <Map>
      <MapGeoJsonCluster
        features={geojson.features}
        chunkedLoading
        chunkInterval={100}
        maxClusterRadius={6}
        zoomToBoundsOnClick={false}
        showCoverageOnHover={false}
        spiderfyOnMaxZoom={false}
        disableClusteringAtZoom={14} />
    </Map>
  })
