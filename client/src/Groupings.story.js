import React from 'react';
import {storiesOf} from '@storybook/react';
import {withFrameSwitcher} from './util/storybookFrames.js';
import Groupings from './Groupings';

storiesOf('Groupings', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <Groupings
        code="foo" />
    );
  });