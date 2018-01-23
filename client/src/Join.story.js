import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import Join from './Join';

storiesOf('Join', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(<Join onNext={action('onNext')} />);
  });