import React from 'react'
import { withKnobs, text, object, array } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import SearchInput from './SearchInput'

export default {
  title: 'II Components/Search/SearchInput',
  decorators: [withKnobs],
  component: SearchInput,
}

export const WithoutSuggestions = () => (
  <SearchInput
    value={text('value', '')}
    placeholder={text('placeholder', 'Suchbegriff eingeben')}
    onInput={action('onInput')}
    onReset={action('onReset')}
    onResult={action('onResult')}
  />
)

export const WithSimpleSuggestions = () => (
  <SearchInput
    value={text('value', 'A')}
    placeholder={text('placeholder', 'Suchbegriff eingeben')}
    suggestions={array('suggestions', ['Apple', 'Banana'])}
    onInput={action('onInput')}
    onReset={action('onReset')}
    onResult={action('onResult')}
  />
)
export const WithFormatedFuggestions = () => (
  <SearchInput
    value={text('value', 'A')}
    placeholder={text('placeholder', 'Suchbegriff eingeben')}
    suggestions={object('suggestions', [
      { value: 0, label: 'Apple' },
      { value: 1, label: 'Banana' },
    ])}
    format={(suggestion) => '-> ' + suggestion.label}
    onInput={action('onInput')}
    onReset={action('onReset')}
    onResult={action('onResult')}
  />
)

export const NothingFound = () => (
  <SearchInput
    value={text('value', 'shjdk')}
    placeholder={text('placeholder', 'Suchbegriff eingeben')}
    nothingFoundText={text('nothingFoundText', 'Nichts gefunden')}
    suggestions={[]}
    onInput={action('onInput')}
    onReset={action('onReset')}
    onResult={action('onResult')}
  />
)

export const WithCancelButton = () => (
  <SearchInput
    value={text('value', 'Banana')}
    buttonType='cancel'
    placeholder={text('placeholder', 'Suchbegriff eingeben')}
    onInput={action('onInput')}
    onReset={action('onReset')}
    onResult={action('onResult')}
  />
)

export const WithDropdownButton = () => (
  <SearchInput
    value={text('value', '')}
    buttonType='dropdown'
    placeholder={text('placeholder', 'Suchbegriff eingeben')}
    onInput={action('onInput')}
    onReset={action('onReset')}
    onResult={action('onResult')}
  />
)
