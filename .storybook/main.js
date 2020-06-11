module.exports = {
  stories: ['../src/components/**/*.stories.mdx', '../src/components/**/*.stories.js'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-storysource'
  ]
};
