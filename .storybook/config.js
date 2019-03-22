import { configure } from '@storybook/react';

const loadStories = () => {
  require('../shared/stories')
}

configure(loadStories, module);
