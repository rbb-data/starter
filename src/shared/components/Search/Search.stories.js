import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, optionsKnob, radios } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { SimpleSearch, DropdownSearch, DropdownSearchWithReactNodes, LocationSearch } from './Search'

const list = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'strawbery', label: 'Strawbery' },
  { value: 'avocado', label: 'Avocado' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grapes', label: 'Grapes' }
]

storiesOf('Search', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .add('SimpleSearch', () =>
    <SimpleSearch list={list} onResult={action('onResult')} onReset={action('onReset')} />
  )
  .add('DropdownSearch', () =>
    <DropdownSearch list={list} onResult={action('onResult')} />
  )
  .add('DropdownSearchWithReactNodes', () =>
    <DropdownSearchWithReactNodes list={list} onResult={action('onResult')} />
  )
  .add('LocationSearch', () => {
    const layers = {
      venue: 'venue',
      street: 'street',
      address: 'address',
      neighbourhood: 'neighbourhood',
      borough: 'borough',
      localadmin: 'localadmin',
      locality: 'locality',
      county: 'county',
      macrocounty: 'macrocounty',
      region: 'region',
      macroregion: 'macroregion',
      country: 'country',
      coarse: 'coarse'
    }
    const sources = {
      openstreetmap: 'openstreetmap',
      openaddresses: 'openaddresses',
      whosonfirst: 'whosonfirst',
      geonames: 'geonames'
    }
    const openrouteConfig = {
      layers: optionsKnob('layers', layers, ['street'], { display: 'multi-select' }),
      location: radios('location', ['berlin', 'brandenburg'], 'berlin'),
      sources: optionsKnob('sources', sources, ['openstreetmap'], { display: 'multi-select' })
    }
    return <LocationSearch openrouteConfig={openrouteConfig} onResult={action('onResult')} />
  })
