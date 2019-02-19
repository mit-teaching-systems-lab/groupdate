import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import './Predict.css';
import {MobileNet} from './mobilenet/mobile_net.ts';

// The Predict screen
class Predict extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   Predict: [],
  //   //   votesCount: 0,
  //   //   error: null
  //   // };
  //   // this.refreshTimer = null;
  //   // this.refreshResponses = this.refreshResponses.bind(this);
  //   // this.onFetchDone = this.onFetchDone.bind(this);
  //   // this.onFetchError = this.onFetchError.bind(this);
  // }

  // Poll the server for new responses
  // Save URL for refresh
  componentDidMount() {
    // this.net = new MobileNet();
    // console.log('this.net', this.net);
    this.createGame();
    // this.refreshResponses();
    // this.refreshTimer = setInterval(this.refreshResponses, 3000);
    // this.setUrl();
  }

  createGame() {
    this.net = new MobileNet();
    this.game = new Game(this.net);
    this.game.init()
      .then(this.onGameInitialized)
      .catch(this.onGameInitializationError)
  }
  
  onGameInitialized() {
    console.log('onGameInitialized');
    // this.scheduleNextTick();
  }

  onGameInitializationError(error) {
    const {messageText} = interpretInitializationError(error);
    alert(messageText);
  }

  // componentWillUnmount(){
  //   clearInterval(this.refreshTimer);
  // }

  // setUrl() {
  //   const {code} = this.props;
  //   window.history.pushState({}, '', `/groups/${code}`);
  // }

  // refreshResponses() {
  //   const {code, groupCount} = this.props;
  //   const url = `/games/${code}/Predict?n=${groupCount}`;
  //   fetch(url)
  //     .then(r => r.json())
  //     .then(this.onFetchDone)
  //     .catch(this.onFetchError);
  // }

  // onFetchDone(json) {
  //   const {Predict, votesCount} = json;
  //   this.setState({Predict, votesCount});
  // }

  // onFetchError(error) {
  //   this.setState({error});
  // }

  render() {

    return (
      <div className="Predict">
      </div>
    );
  }
}
Predict.propTypes = {
};


export default Predict;
