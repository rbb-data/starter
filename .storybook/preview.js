import React from 'react';
import rbb24Theme from './rbb24Theme';
import 'global_styles/index.scss';

const withInterstateFont = (Story, context) => {
  return (
    <div style={{ fontFamily: 'Interstate' }}>
      <Story {...context} />
    </div>
  );
};

export const decorators = [withInterstateFont];
export const parameters = {
  viewMode: 'docs',
  options: {
    // sort stories by name
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
  docs: {
    theme: rbb24Theme,
  },
};
