import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TappableButton from './components/TappableButton';
import dog from './img/charles-716555-unsplash.jpg';
import './Splash.css';


// The splash screen
class Splash extends Component {
  constructor(props) {
    super(props);

    this.onStart = this.onStart.bind(this);
  }

  onStart() {
    this.props.onNext();
  }

  render() {
    const {onNext} = this.props;

    return (
      <div className="Splash">
        <div style={{position: 'relative', margin: 0}}>
          <div className="Splash-title">labelit</div>
          <img alt="labelit dog" src={dog} width="100%" style={{minHeight: 220}} />
        </div>
        <TappableButton onClick={() => onNext()}>Start</TappableButton>
      </div>
    );
  }
}
Splash.propTypes = {
  onNext: PropTypes.func.isRequired
};

export default Splash;
