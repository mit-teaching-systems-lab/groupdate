import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TappableButton from './components/TappableButton';
import gif from './waiting.gif';
import './Wait.css';


// The Wait screen
class Wait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      error: null
    };
    this.refreshTimer = null;
    this.refreshResponses = this.refreshResponses.bind(this);
    this.onFetchDone = this.onFetchDone.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onAddMore = this.onAddMore.bind(this);
  }

  // Poll the server for new responses
  componentDidMount() {
    this.refreshResponses();
    this.refreshTimer = setInterval(this.refreshResponses, 3000);
  }

  componentWillUnmount(){
    clearInterval(this.refreshTimer);
  }

  refreshResponses() {
    const {code} = this.props;
    const url = `/games/${code}/cards`;
    fetch(url)
      .then(r => r.json())
      .then(this.onFetchDone)
      .catch(this.onFetchError);
  }

  onFetchDone(json) {
    this.setState({ cards: json.rows });
  }

  onFetchError(error) {
    this.setState({error});
  }

  onStart() {
    const {cards} = this.state;
    this.props.onNext(cards);
  }

  onAddMore() {
    this.props.onAddMore();
  }

  render() {
    const {cards} = this.state;
    const {code} = this.props;

    return (
      <div className="Wait">
        <div className="Global-content">
          <div className="Global-title">
            {cards.length === 0
              ? 'Waiting for pals...'
              : `Group ${code} has ${cards.length} ${cards.length === 1 ? 'pal' : 'pals'}, waiting for more...`}
          </div>
          <img src={gif} style={{marginBottom: 20}} alt="waiting..." width="100%" />
          <TappableButton
            disabled={cards.length === 0}
            onClick={this.onStart}>{`We're all ready to start`}</TappableButton>
          <TappableButton
            outerStyle={styles.outerButton}
            style={styles.subtleButton}
            onClick={this.onAddMore}>Add another thought</TappableButton>
        </div>
      </div>
    );
  }
}
Wait.propTypes = {
  code: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
  onAddMore: PropTypes.func.isRequired
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
