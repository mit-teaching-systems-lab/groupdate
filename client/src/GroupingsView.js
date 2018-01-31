import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import TappableButton from './components/TappableButton';
import './GroupingsView.css';


// The GroupingsView screen
class GroupingsView extends Component {
  constructor(props) {
    super(props);
    this.onRestart = this.onRestart.bind(this);
  }

  onRestart() {
    window.location = window.location.origin;
  }

  render() {
    const {groupings} = this.props;
    return (
      <div className="GroupingsView">
        <div className="Global-content">
          <div className="Global-title">Go start a conversation!</div>
          <div style={{padding: 10}}>Pick a group to start with, but you can talk about anything you want within those groups.</div>
          <div>
            {groupings.map((grouping) => {
              const {color, letter, cards} = grouping;
              return (
                <div
                  key={letter}
                  className="GroupingsView-grouping"
                  style={{backgroundColor: color, border: `5px solid ${color}`}}>
                  <div className="GroupingsView-title">group {letter}</div>
                  <div className="GroupingsView-cards">
                    {cards.slice(0, 1).map((card) => {
                      return <div
                        key={card.id}
                        className="GroupingsView-card">{card.text}</div>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {this.renderOthers(groupings)}
          {this.renderRestart()}
        </div>
      </div>
    );
  }

  renderOthers(groupings) {
    const color = 'white';
    const cards = _.flatten(groupings.map(grouping => {
      const {cards} = grouping;
      return cards.slice(1);
    }));

    if (cards.length === 0) return null;

    return (
      <div
        key="other"
        className="GroupingsView-grouping GroupingsView-other"
        style={{backgroundColor: color, border: `5px solid ${color}`}}>
        <div className="GroupingsView-title">all the other good thoughts</div>
        <div className="GroupingsView-cards">
          {cards.map(card => {
            return <div
              key={card.id}
              className="GroupingsView-card">{card.text}</div>;
          })}
        </div>
      </div>
    );
  }

  renderRestart() {
    return (
      <div style={{marginBottom: 20, marginTop: 50}}>
        <TappableButton
          outerStyle={styles.outerButton}
          style={styles.subtleButton}
          onClick={this.onRestart}>Restart with another group code</TappableButton>
      </div>
    );
  }
}
GroupingsView.propTypes = {
  groupings: PropTypes.arrayOf(PropTypes.object).isRequired,
  code: PropTypes.string.isRequired
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

export default GroupingsView;
