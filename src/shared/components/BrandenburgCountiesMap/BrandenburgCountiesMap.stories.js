import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import rbbColors from '../../styles/colors.sass'
import BrandenburgCountiesMap from './BrandenburgCountiesMap'

storiesOf('BrandenburgCountiesMap', module)
  .add('with default props', () =>
    <div style={{ width: '200px' }}>
      <BrandenburgCountiesMap onAreaSelect={action('onAreaSelect')} />
    </div>
  )
  .add('with Berlin selected', () =>
    <div style={{ width: '200px' }}>
      <BrandenburgCountiesMap selectedAreas={['Berlin']} onAreaSelect={action('onAreaSelect')} />
    </div>
  )
  .add('with multiple selected', () =>
    <div style={{ width: '200px' }}>
      <BrandenburgCountiesMap
        selectedAreas={['Oder-Spree', 'Märkisch-Oderland']}
        onAreaSelect={action('onAreaSelect')} />
    </div>
  )
  .add('with custom color', () =>
    <div style={{ width: '200px' }}>
      <BrandenburgCountiesMap
        areaColor={county => county === 'Uckermark' ? rbbColors.red : rbbColors.lightGrey}
        onAreaSelect={action('onAreaSelect')} />
    </div>
  )
