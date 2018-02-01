import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import uuid from 'uuid';
import MobileSimulator from './components/MobileSimulator.js';
import Join from './Join';
import Words from './Words';
import Wait from './Wait';
import Swiping from './Swiping';
import Groupings from './Groupings';
import './App.css';
import gif from './waiting.gif';


// The main entry point for the app, routing to different pages.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: uuid.v4(),
      screenKey: 'join',
      wordLimit: 10,
      groupCount: 5,
      code: null,
      myCard: null,
      cards: null
    };
    this.renderScreen = this.renderScreen.bind(this);
    this.renderGroups = this.renderGroups.bind(this);
    this.renderGroupsFromUrl = this.renderGroupsFromUrl.bind(this);
    this.doPostCard = this.doPostCard.bind(this);
    this.doPostRating = this.doPostRating.bind(this);
    this.onDoneJoin = this.onDoneJoin.bind(this);
    this.onDoneWords = this.onDoneWords.bind(this);
    this.onDoneWait = this.onDoneWait.bind(this);
    this.onAddMore = this.onAddMore.bind(this);
    this.onDoneSwiping = this.onDoneSwiping.bind(this);
    this.onPostCardDone = this.onPostCardDone.bind(this);
    this.onPostCardError = this.onPostCardError.bind(this);
  }

  // Optimization to prefetch subsequent image
  componentDidMount() {
    const image = new Image();
    image.src = gif;
  }
  
  doPostCard(code, text) {
    const {sessionId} = this.state;
    const url = `/games/${code}/card`;
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({text, sessionId})
    };
    return fetch(url, options)
      .then(r => r.json())
      .then(this.onPostCardDone)
      .catch(this.onPostCardError);
  }

  // fire and forget
  doPostRating(card, rating) {
    const {sessionId} = this.state;
    const cardId = card.id;
    const url = `/cards/${cardId}/rating`;
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({cardId, rating, sessionId})
    });
  }

  onPostCardDone(json) {
    const {card} = json;
    this.setState({ myCard: card });
  }

  onPostCardError(err) {
    console.error('onPostCardError', err); // eslint-disable-line no-console
  }
  
  onDoneJoin(code) {
    this.setState({code, screenKey: 'words' 
    });
  }

  onDoneWords() {
    this.setState({ screenKey: 'wait' });
  }

  onDoneWait(cards) {
    this.setState({cards, screenKey: 'swiping' });
  }

  onAddMore() {
    this.setState({ screenKey: 'words' });
  }

  onDoneSwiping() {
    this.setState({ screenKey: 'groupings' });
  }

  render() {
    return (
      <MobileSimulator minWidth={800} minHeight={400}>
        <BrowserRouter>
          <div className="App">
            <Route exact path="/" render={this.renderScreen} />
            <Route exact path="/groups/:code" render={this.renderGroupsFromUrl} />
          </div>
        </BrowserRouter>
      </MobileSimulator>
    );
  }

  renderScreen(props) {
    const {
      screenKey,
      code,
      wordLimit,
      cards,
    } = this.state;

    if (screenKey === 'join') {
      return <Join onNext={this.onDoneJoin} />;
    }

    if (screenKey === 'words') {
      return (
        <Words
          code={code}
          limit={wordLimit}
          doPostCard={this.doPostCard}
          onNext={this.onDoneWords} />
      );
    }

    if (screenKey === 'wait') {
      return (
        <Wait
          code={code}
          onNext={this.onDoneWait}
          onAddMore={this.onAddMore} />
      );
    }

    if (screenKey === 'swiping') {
      return (
        <Swiping
          code={code}
          cards={cards}
          doPostRating={this.doPostRating}
          onNext={this.onDoneSwiping} />
      );
    }

    if (screenKey === 'groupings') {
      return this.renderGroups(code);
    }

    return <div>not yet...</div>;
  }

  renderGroupsFromUrl(props) {
    const {code} = props.match.params;
    return this.renderGroups(code);
  }

  renderGroups(code) {
    const {groupCount} = this.state;
    return <Groupings code={code} groupCount={groupCount} />;
  }
}

export default App;
