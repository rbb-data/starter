import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'

const loadStories = () => {
  require('../src/shared/stories')
}

addDecorator(withInfo)
configure(loadStories, module);
