import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import Swiping from './Swiping';

storiesOf('Swiping', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <Swiping
        code="MIT"
        cards={[
          { text: 'hello there' },
          { text: 'wat' },
          { text: 'okay' }
        ]}
        doPostRating={() => Promise.resolve(null)}
        onNext={action('onNext')} />
    );
  });