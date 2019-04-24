import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, select, number, text, object } from '@storybook/addon-knobs'

import TabBar from './TabBar'

storiesOf('TabBar', module)
  .addDecorator(withKnobs)
  .add('Number as value', () => {
    const tabs = object('tabs', [
      { value: 0, display: 'Option number one' },
      { value: 1, display: 'Option number two' }
    ])

    return <TabBar
      id='tab-bar-id'
      class='custom-class-name'
      title='select something'
      selectedValue={number('selectedValue', 0)}
      tabs={tabs}
      onSelect={action('changed')} />
  })

  .add('String as value', () => {
    const tabs = object('tabs', [
      { value: 'one', display: 'Option number one' },
      { value: 'two', display: 'Option number two' }
    ])

    return <TabBar
      id='tab-bar-id'
      class='custom-class-name'
      title='select something'
      selectedValue={text('selectedValue', 'one')}
      tabs={tabs}
      onSelect={action('changed')} />
  })

  .add('With react components', () => {
    const tabs = [
      { value: 'one', display: <span>Option <i>number one</i></span> },
      { value: 'two', display: <span>Option <i>number two</i></span> }
    ]

    return <TabBar id='tab-bar-id'
      class='custom-class-name'
      title='select something'
      selectedValue={select('selectedValue', ['one', 'two'], 'one')}
      tabs={tabs}
      onSelect={action('changed')} />
  })
