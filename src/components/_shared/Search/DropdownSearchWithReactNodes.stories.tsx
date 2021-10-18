import React from 'react';
import { Story, Meta } from '@storybook/react';
import { SimpleSearch, DropdownSearchWithReactNodes } from './Search';
import { DropdownSearchWithReactNodesProps } from './examples/DropdownSearchWithReactNodes';

export default {
  title: 'II Components/Search/Examples/DropdownSearchWithReactNodes',
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

const Circle = (props: { color: string }) => (
  <div
    style={{
      display: 'inline-block',
      marginRight: '5px',
      backgroundColor: props.color,
      width: '10px',
      height: '10px',
      borderRadius: '10px',
    }}
  />
);

export const Basic: Story = <T extends unknown>(
  args: DropdownSearchWithReactNodesProps<T>
) => <DropdownSearchWithReactNodes {...args} />;
Basic.args = {
  list: list,
  fuseOptions: { keys: ['label'] },
  formatString: (suggestion) => suggestion.label,
  formatNode: (suggestion) => (
    <div>
      <Circle color={suggestion.color} />
      {suggestion.label}
    </div>
  ),
  placeholder: 'auswählen',
};
