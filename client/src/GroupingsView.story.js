import React from 'react';
import {storiesOf} from '@storybook/react';
import {withFrameSwitcher} from './util/storybookFrames.js';
import GroupingsView from './GroupingsView';

storiesOf('GroupingsView', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <GroupingsView
        myCard={{"id":5,"text":"hello there"}}
        groupings={[{"letter":"a","color":"#a6cee3","cards":[{"id":2,"text":"hriew","score":56},{"id":3,"text":"rewierw","score":31},{"id":8,"text":"hello world","score":14}]},{"letter":"b","color":"#1f78b4","cards":[{"id":5,"text":"hello there","score":56},{"id":1,"text":"hiya","score":31}]},{"letter":"c","color":"#b2df8a","cards":[{"id":6,"text":"wat","score":56},{"id":7,"text":"eeee","score":31}]}]}
        code="foo"
        groupCount={3} />
    );
  });
