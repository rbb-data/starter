import React from 'react'
import PropTypes from 'prop-types'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, optionsKnob, radios } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { SimpleSearch, DropdownSearch, DropdownSearchWithReactNodes, LocationSearch } from './Search'

const list = [
  { color: 'red', label: 'Apple' },
  { color: 'yellow', label: 'Banana' },
  { color: 'red', label: 'Strawbery' },
  { color: 'green', label: 'Avocado' },
  { color: 'blue', label: 'Blueberry' },
  { color: 'red', label: 'Cherry' },
  { color: 'green', label: 'Grapes' }
]

const Circle = ({ color }) =>
  <div style={{
    display: 'inline-block',
    marginRight: '5px',
    backgroundColor: color,
    width: '10px',
    height: '10px',
    borderRadius: '10px'
  }} />

Circle.propTypes = { color: PropTypes.string }

storiesOf('Search', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .add('SimpleSearch', () =>
    <SimpleSearch
      list={list}
      fuseOptions={{ keys: ['label'] }}
      format={suggestion => suggestion.label}
      onResult={action('onResult')}
      onReset={action('onReset')} />
  )
  .add('DropdownSearch', () =>
    <DropdownSearch
      list={list}
      fuseOptions={{ keys: ['label'] }}
      format={suggestion => suggestion.label}
      onResult={action('onResult')} />
  )
  .add('DropdownSearchWithReactNodes', () =>
    <DropdownSearchWithReactNodes
      list={list}
      fuseOptions={{ keys: ['label'] }}
      formatString={suggestion => suggestion.label}
      formatNode={suggestion => <div><Circle color={suggestion.color} />{suggestion.label}</div>}
      onResult={action('onResult')} />
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
