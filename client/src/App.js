import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import MobileSimulator from './components/MobileSimulator.js';
import Join from './Join';
import Words from './Words';
import Wait from './Wait';
import './App.css';


// The main entry point for the app, routing to different pages.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenKey: 'join'
    };
    this.renderScreen = this.renderScreen.bind(this);
    this.onDoneJoin = this.onDoneJoin.bind(this);
    this.onDoneWords = this.onDoneWords.bind(this);
    this.onDoneWait = this.onDoneWait.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onDoneJoin() {
    this.setState({ screenKey: 'words' });
  }

  onDoneWords() {
    this.setState({ screenKey: 'wait' });
  }

  onDoneWait() {
    this.setState({ screenKey: 'swipe' });
  }

  onReset() {
    this.setState({ screenKey: 'join' });
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
    const {screenKey} = this.state;
    if (screenKey === 'join') {
      return <Join onNext={this.onDoneJoin} />;
    } else if (screenKey === 'words') {
      return <Words onNext={this.onDoneWords} />;
    } else if (screenKey === 'wait') {
      return <Wait onNext={this.onDoneWait} onCancel={this.onReset} />;
    } else if (screenKey === 'swipe') {
      return <div>swipe...</div>;
    } else {
      return <div>not yet...</div>;
    }
  }
}

export default App;
