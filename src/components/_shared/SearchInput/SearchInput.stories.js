import React from 'react';
import { action } from '@storybook/addon-actions';
import SearchInput from './SearchInput';

export default {
  title: 'II Components/Search/SearchInput',
  component: SearchInput,
};

export const WithoutSuggestions = (args) => (
  <SearchInput
    {...args}
    onInput={action('onInput')}
    onReset={action('onReset')}
    onResult={action('onResult')}
  />
);

WithoutSuggestions.args = {
  value: '',
  placeholder: 'Suchbegriff eingeben',
};

export const WithSimpleSuggestions = (args) => (
  <SearchInput
    {...args}
    onInput={action('onInput')}
    onReset={action('onReset')}
    onResult={action('onResult')}
  />
);

WithSimpleSuggestions.args = {
  value: 'A',
  placeholder: 'Suchbegriff eingeben',
  suggestions: ['Apple', 'Banana'],
};

export const WithFormattedSuggestions = (args) => (
  <SearchInput
    {...args}
    format={(suggestion) => '-> ' + suggestion.label}
    onInput={action('onInput')}
    onReset={action('onReset')}
    onResult={action('onResult')}
  />
);

WithFormattedSuggestions.args = {
  value: 'A',
  placeholder: 'Suchbegriff eingeben',
  suggestions: [
    { value: 0, label: 'Apple' },
    { value: 1, label: 'Banana' },
  ],
};

export const NothingFound = (args) => (
  <SearchInput
    {...args}
    suggestions={[]}
    onInput={action('onInput')}
    onReset={action('onReset')}
    onResult={action('onResult')}
  />
);

NothingFound.args = {
  value: 'shjdk',
  placeholder: 'Suchbegriff eingeben',
  nothingFoundText: 'Nichts gefunden',
};

export const WithCancelButton = (args) => (
  <SearchInput
    {...args}
    buttonType="cancel"
    onInput={action('onInput')}
    onReset={action('onReset')}
    onResult={action('onResult')}
  />
);

WithCancelButton.args = {
  value: 'Banana',
  placeholder: 'Suchbegriff eingeben',
};

export const WithDropdownButton = (args) => (
  <SearchInput
    {...args}
    buttonType="dropdown"
    onInput={action('onInput')}
    onReset={action('onReset')}
    onResult={action('onResult')}
  />
);

WithDropdownButton.args = {
  value: '',
  placeholder: 'Suchbegriff eingeben',
};
