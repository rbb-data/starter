module.exports = {
  stories: [
    '../styleguide/**/*.stories.@(js|mdx)',
    '../src/components/**/*.stories.@(js|mdx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-actions/register',
    '@storybook/preset-create-react-app',
  ],
}
