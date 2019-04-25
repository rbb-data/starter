import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import SearchInput from './SearchInput'

storiesOf('SearchInput', module)
  .addDecorator(withKnobs)
  .add('Without suggestions', () => {
    return <SearchInput
      placeholder={text('placeholder', 'Suchbegriff eingeben')}
      onInput={action('onInput')}
      onReset={action('onReset')}
      onResult={action('onResult')} />
  })
  .add('With suggestions', () => {
    return <SearchInput
      placeholder={text('placeholder', 'Suchbegriff eingeben')}
      suggestions={object('suggestions', [
        { value: 0, label: 'Apple' },
        { value: 1, label: 'Banana' }
      ])}
      onInput={action('onInput')}
      onReset={action('onReset')}
      onResult={action('onResult')} />
  })
  .add('Nothing Found', () => {
    return <SearchInput
      placeholder={text('placeholder', 'Suchbegriff eingeben')}
      nothingFoundText={text('nothingFoundText', 'Nichts gefunden')}
      suggestions={[]}
      onInput={action('onInput')}
      onReset={action('onReset')}
      onResult={action('onResult')} />
  })
  .add('With cancel button', () => {
    return <SearchInput
      buttonType='cancel'
      placeholder={text('placeholder', 'Suchbegriff eingeben')}
      onInput={action('onInput')}
      onReset={action('onReset')}
      onResult={action('onResult')} />
  })
  .add('With dropdown button', () => {
    return <SearchInput
      buttonType='dropdown'
      placeholder={text('placeholder', 'Suchbegriff eingeben')}
      onInput={action('onInput')}
      onReset={action('onReset')}
      onResult={action('onResult')} />
  })
  .add('With controlled Input', () => {
    return <SearchInput
      textInputValue={text('textInputValue', 'Banana')}
      buttonType='cancel'
      onInput={action('onInput')}
      onReset={action('onReset')}
      onResult={action('onResult')} />
  })
