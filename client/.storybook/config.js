import { configure } from '@storybook/react';

function loadStories() {
  require('../src/Join.story.js');
  require('../src/Words.story.js');
  require('../src/Wait.story.js');
  require('../src/Swiping.story.js');
  require('../src/GroupingsView.story.js');
  // You can require as many stories as you need.
}

configure(loadStories, module); //eslint-disable-line no-undef