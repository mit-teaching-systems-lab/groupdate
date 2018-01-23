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


// The main entry point for the app, routing to different pages.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: uuid.v4(),
      screenKey: 'join',
      wordLimit: 6,
      groupSize: 6,
      code: null,
      cards: null
    };
    this.renderScreen = this.renderScreen.bind(this);
    this.doPostCard = this.doPostCard.bind(this);
    this.doPostRating = this.doPostRating.bind(this);
    this.onDoneJoin = this.onDoneJoin.bind(this);
    this.onDoneWords = this.onDoneWords.bind(this);
    this.onDoneWait = this.onDoneWait.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onDoneSwiping = this.onDoneSwiping.bind(this);
  }

  doPostCard(code, text) {
    const {sessionId} = this.state;
    const url = `/games/${code}/card`;
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({text, sessionId})
    }).then(r => r.json());
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

  onReset() {
    this.setState({ screenKey: 'join' });
  }

  onDoneSwiping() {
    this.setState({ screenKey: 'groupings' });
  }

  render() {
    return (
      <MobileSimulator minWidth={800} minHeight={400}>
        <div className="App">
          <BrowserRouter>
            <Route exact path="/" render={this.renderScreen} />
          </BrowserRouter>
        </div>
      </MobileSimulator>
    );
  }

  renderScreen(props) {
    const {
      screenKey,
      code,
      wordLimit,
      cards
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
          onCancel={this.onReset} />
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
      return (
        <Groupings
          code={code}
          groupSize={groupSize} />
      );
    }

    return <div>not yet...</div>;
  }
}

export default App;
