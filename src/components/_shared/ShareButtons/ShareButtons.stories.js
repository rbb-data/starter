import React from 'react';
import ShareButtons from './ShareButtons';

export default {
  title: 'II Components/ShareButtons',
  component: ShareButtons,
};

export const Basic = (args) => <ShareButtons {...args} />;

Basic.args = {
  title: 'Diese Karte teilen',
  url:
    'https://rbb-s0.w3.rbb-online.de/app/rdat-first-names-sharing/?type=map&name=noah&gender=m',
  description:
    'So beliebt war der Name Noah 2019 in den verschiedenen Berliner Bezirken.',
};
