import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import MobileSimulator from './components/MobileSimulator.js';
import TappableButton from './components/TappableButton';
import './App.css';


// The main entry point for the app, routing to different pages.
class App extends Component {
  constructor(props) {
    super(props);
    this.onStart = this.onStart.bind(this);
    this.renderStart = this.renderStart.bind(this);
  }

  onStart(e) {
    console.log('start');
  }

  render() {
    return (
      <MobileSimulator minWidth={800} minHeight={400}>
        <BrowserRouter>
          <Route exact path="/" render={this.renderStart} />
        </BrowserRouter>
      </MobileSimulator>
    );
  }

  renderStart(props) {
    return (
      <div className="App-start">
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <TappableButton onClick={this.onStart}>Start!</TappableButton>
      </div>
    );
  }
}

export default App;
