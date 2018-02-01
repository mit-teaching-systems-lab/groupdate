import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import Wait from './Wait';

storiesOf('Wait', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <Wait
        code="foo"
        onNext={action('onNext')}
        onAddMore={action('onAddMore')} />
    );
  });