import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, number, text, array } from '@storybook/addon-knobs'

import TabBar from './TabBar'

storiesOf('TabBar', module)
  .addDecorator(withKnobs)
  .add('Basic Example', () => {
    const tabs = array('tabs', ['one', 'two', 'three'])

    return <TabBar
      id='tab-bar-id'
      class='custom-class-name'
      title='select something'
      selectedTab={text('selectedTab', 'one')}
      tabs={tabs}
      onSelect={action('changed')} />
  })

  .add('With custom color', () => {
    const tabs = [
      { color: 'red', display: 'Option number one' },
      { color: 'blue', display: 'Option number two' },
      { color: 'green', display: 'Option number three' }
    ]

    const selectedTabIndex = number('selectedTabIndex', 0)
    const selectedTab = tabs[selectedTabIndex]

    return <TabBar
      id='tab-bar-id'
      class='custom-class-name'
      title='select something'
      selectedTab={selectedTab}
      tabs={tabs}
      format={tab => tab.display}
      color={tab => tab === selectedTab ? tab.color : null}
      onSelect={action('changed')} />
  })

  .add('With react components', () => {
    const tabs = [
      { value: 'one', display: <span>Option <i>number one</i></span> },
      { value: 'two', display: <span>Option <i>number two</i></span> },
      { value: 'three', display: <span>Option <i>number three</i></span> }
    ]

    const selectedTabIndex = number('selectedTabIndex', 0)
    const selectedTab = tabs[selectedTabIndex]

    return <TabBar id='tab-bar-id'
      class='custom-class-name'
      title='select something'
      selectedTab={selectedTab}
      format={tab => tab.display}
      tabs={tabs}
      onSelect={action('changed')} />
  })
