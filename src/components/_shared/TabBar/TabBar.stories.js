import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, number, text, array } from '@storybook/addon-knobs'
import TabBar from './TabBar'

export default {
  title: 'II Components/TabBar',
  decorators: [withKnobs],
  component: TabBar,
}

export const Basic = () => {
  const tabs = array('tabs', ['one', 'two', 'three'])

  return (
    <TabBar
      id='tab-bar-id'
      class='custom-class-name'
      title='select something'
      selectedTab={text('selectedTab', 'one')}
      tabs={tabs}
      onChange={action('changed')}
    />
  )
}

export const WithCustomColor = () => {
  const tabs = [
    { color: 'red', display: 'Option number one' },
    { color: 'blue', display: 'Option number two' },
    { color: 'green', display: 'Option number three' },
  ]

  const selectedTabIndex = number('selectedTabIndex', 0)
  const selectedTab = tabs[selectedTabIndex]

  return (
    <TabBar
      id='tab-bar-id'
      class='custom-class-name'
      title='select something'
      selectedTab={selectedTab}
      tabs={tabs}
      format={(tab) => tab.display}
      color={(tab) => (tab === selectedTab ? tab.color : null)}
      onChange={action('changed')}
    />
  )
}

export const WithReactComponents = () => {
  const tabs = [
    {
      value: 'one',
      display: (
        <span>
          Option <i>number one</i>
        </span>
      ),
    },
    {
      value: 'two',
      display: (
        <span>
          Option <i>number two</i>
        </span>
      ),
    },
    {
      value: 'three',
      display: (
        <span>
          Option <i>number three</i>
        </span>
      ),
    },
  ]

  const selectedTabIndex = number('selectedTabIndex', 0)
  const selectedTab = tabs[selectedTabIndex]

  return (
    <TabBar
      id='tab-bar-id'
      class='custom-class-name'
      title='select something'
      selectedTab={selectedTab}
      format={(tab) => tab.display}
      tabs={tabs}
      onChange={action('changed')}
    />
  )
}
