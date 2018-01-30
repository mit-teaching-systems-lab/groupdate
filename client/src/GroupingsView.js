import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './GroupingsView.css';


// The GroupingsView screen
class GroupingsView extends Component {
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
        </div>
      </div>
    );
  }

  renderOthers(groupings) {
    const color = 'white';
    return (
      <div
        key="other"
        className="GroupingsView-grouping"
        style={{backgroundColor: color, border: `5px solid ${color}`}}>
        <div className="GroupingsView-title">all the other good ideas</div>
        <div className="GroupingsView-cards">
          {groupings.map(grouping => {
            const {cards} = grouping;
            return cards.slice(1).map(card => {
              return <div
                key={card.id}
                className="GroupingsView-card">{card.text}</div>;
            });
          })}
        </div>
      </div>
    );
  }
}
GroupingsView.propTypes = {
  groupings: PropTypes.arrayOf(PropTypes.object).isRequired,
  code: PropTypes.string.isRequired
};


export default GroupingsView;
