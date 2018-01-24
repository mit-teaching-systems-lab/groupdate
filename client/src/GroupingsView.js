import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './GroupingsView.css';


// The GroupingsView screen
class GroupingsView extends Component {
  render() {
    const {myCard, groupings} = this.props;
    const myGrouping = _.find(groupings, grouping => {
      return _.find(grouping.cards, card => card.id === myCard.id) !== undefined;
    });
    const sortedGroupings = _.sortBy(groupings, (grouping, index) => {
      return (grouping === myGrouping) ? -1 : -1 * index;
    });
    return (
      <div className="GroupingsView">
        <div className="GroupingsView-content">
          <div className="GroupingsView-title">you matched: group {myGrouping.letter}</div>
          <div>
            {sortedGroupings.map((grouping) => {
              const {color, letter, cards} = grouping;
              return (
                <div key={letter} className="GroupingsView-grouping" style={{backgroundColor: color}}>
                  <div className="GroupingsView-title">group {letter}</div>
                  <div className="GroupingsView-cards">
                    {cards.map((card) => {
                      return <div
                        key={card.id}
                        className="GroupingsView-card">{card.text}</div>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
GroupingsView.propTypes = {
  groupings: PropTypes.arrayOf(PropTypes.object).isRequired,
  myCard: PropTypes.object.isRequired,
  code: PropTypes.string.isRequired
};


export default GroupingsView;
