import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import Words from './Words';

storiesOf('Words', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <Words
        code="foo"
        limit={6}
        doPostCard={() => {
          action('doPostCard');
          return Promise.resolve({});
        }}
        onNext={action('onNext')} />
    );
  });
  