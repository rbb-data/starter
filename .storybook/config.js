import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'

const loadStories = () => {
  require('../shared/stories')
}

addDecorator(withInfo)
configure(loadStories, module);
