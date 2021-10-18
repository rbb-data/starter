import React from 'react';
import { action } from '@storybook/addon-actions';

import BrandenburgCountiesMap from './BrandenburgCountiesMap';

import * as rbbColors from 'global_styles/colors';

export default {
  title: 'II Components/BrandenburgCountiesMap',
  component: BrandenburgCountiesMap,
  args: {
    onAreaSelect: action('onAreaSelect'),
  },
};

const Template = (args) => (
  <div style={{ width: '200px' }}>
    <BrandenburgCountiesMap {...args} />
  </div>
);

export const WithDefaultProps = Template.bind({});
export const WithBerlinSelected = Template.bind({});
export const WithMultipleSelected = Template.bind({});
export const WithCustomColor = Template.bind({});

WithBerlinSelected.args = { selectedAreas: ['Berlin'] };
WithMultipleSelected.args = {
  selectedAreas: ['Oder-Spree', 'Märkisch-Oderland'],
};
WithCustomColor.args = {
  areaColor: (county) =>
    county === 'Uckermark' ? rbbColors.red : rbbColors.lightGrey,
};
