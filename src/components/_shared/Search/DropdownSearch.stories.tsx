import React from 'react';
import { Story, Meta } from '@storybook/react';
import { SimpleSearch, DropdownSearch } from './Search';
import { DropdownSearchProps } from './examples/DropdownSearch';

export default {
  title: 'II Components/Search/Examples/DropdownSearch',
  component: SimpleSearch,
} as Meta;

const list = [
  { color: 'red', label: 'Apple' },
  { color: 'yellow', label: 'Banana' },
  { color: 'red', label: 'Strawberry' },
  { color: 'green', label: 'Avocado' },
  { color: 'blue', label: 'Blueberry' },
  { color: 'red', label: 'Cherry' },
  { color: 'green', label: 'Grapes' },
];

export const Basic: Story = <T extends unknown>(
  args: DropdownSearchProps<T>
) => <DropdownSearch {...args} />;
Basic.args = {
  list: list,
  fuseOptions: { keys: ['label'] },
  format: (suggestion) => suggestion.label,
  placeholder: 'auswählen',
  onResult: () => {},
};
