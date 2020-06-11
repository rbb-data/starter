import React from 'react'

import { action } from '@storybook/addon-actions'

import rbbColors from 'global_styles/colors.sass'
import BrandenburgCountiesMap from './BrandenburgCountiesMap'

export default {
  title: 'II Components/BrandenburgCountiesMap',
  component: BrandenburgCountiesMap,
}

export const WithDefaultProps = () => (
  <div style={{ width: '200px' }}>
    <BrandenburgCountiesMap onAreaSelect={action('onAreaSelect')} />
  </div>
)

export const WithBerlinSelected = () => (
  <div style={{ width: '200px' }}>
    <BrandenburgCountiesMap
      selectedAreas={['Berlin']}
      onAreaSelect={action('onAreaSelect')}
    />
  </div>
)

export const WithMultipleSelected = () => (
  <div style={{ width: '200px' }}>
    <BrandenburgCountiesMap
      selectedAreas={['Oder-Spree', 'Märkisch-Oderland']}
      onAreaSelect={action('onAreaSelect')}
    />
  </div>
)

export const WithCustomCOlor = () => (
  <div style={{ width: '200px' }}>
    <BrandenburgCountiesMap
      areaColor={(county) =>
        county === 'Uckermark' ? rbbColors.red : rbbColors.lightGrey
      }
      onAreaSelect={action('onAreaSelect')}
    />
  </div>
)
