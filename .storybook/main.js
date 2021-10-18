module.exports = {
  stories: [
    '../styleguide/**/*.stories.@(js|mdx)',
    '../src/components/**/*.stories.@(js|mdx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/preset-create-react-app',
  ],
};
