import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TappableButton from './components/TappableButton';
import './Wait.css';


// The Wait screen
class Wait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerCount: null
    };
    this.onStart = this.onStart.bind(this);
  }

  componentDidMount() {
    // fetch
  }

  onStart() {
    this.props.onNext();
  }

  onCancel() {
    this.props.onCancel();
  }

  render() {
    const {playerCount} = this.state;

    return (
      <div className="Wait">
        <div className="Wait-content">
          <p>
            {playerCount === null
              ? 'Waiting for pals...'
              : `Found ${playerCount} ${playerCount === 1 ? 'pal' : 'pals'} and waiting for more...`}
          </p>
          <TappableButton onClick={this.onStart}>Start</TappableButton>
          <TappableButton
            outerStyle={styles.outerButton}
            style={styles.subtleButton}
            onClick={this.onCancel}>Restart</TappableButton>
        </div>
      </div>
    );
  }
}
Wait.propTypes = {
  onNext: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};


const styles = {
  outerButton: {
    marginTop: 10
  },
  subtleButton: {
    backgroundColor: '#eee',
    color: 'black'
  }
};

export default Wait;
