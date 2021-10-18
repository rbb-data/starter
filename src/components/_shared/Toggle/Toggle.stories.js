import React from 'react';
import { action } from '@storybook/addon-actions';
import Toggle from './Toggle';

export default {
  title: 'II Components/Toggle',
  component: Toggle,
};

export const Basic = (args) => (
  <Toggle name={'input1'} onChange={action('onChange')} {...args} />
);

Basic.args = {
  options: ['Option A', 'Option B'],
  active: 'Option A',
};

export const WithCustomFormat = () => {
  const options = [
    { firstname: 'Tina', lastname: 'Klein' },
    { firstname: 'Kim', lastname: 'Frank' },
  ];
  const active = options[0];

  return (
    <Toggle
      name={'input2'}
      options={options}
      active={active}
      format={(option) => `${option.firstname}.${option.lastname}`}
      onChange={action('onChange')}
    />
  );
};
