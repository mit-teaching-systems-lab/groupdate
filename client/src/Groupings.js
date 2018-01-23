import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Groupings.css';


// The Groupings screen
class Groupings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupings: [{"letter":"a","color":"#a6cee3","cards":[{"id":2,"text":"hriew","score":42},{"id":7,"text":"eeee","score":17}]},{"letter":"b","color":"#1f78b4","cards":[{"id":5,"text":"hello there","score":42}]},{"letter":"c","color":"#b2df8a","cards":[{"id":6,"text":"wat","score":42}]},{"letter":"d","color":"#33a02c","cards":[{"id":3,"text":"rewierw","score":17}]},{"letter":"e","color":"#fb9a99","cards":[{"id":1,"text":"hiya","score":17}]}],
      error: null
    };
    this.refreshTimer = null;
    this.refreshResponses = this.refreshResponses.bind(this);
    this.onFetchDone = this.onFetchDone.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
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
    const {code, groupSize} = this.props;
    const url = `/games/${code}/groupings?n=${groupSize}`;
    fetch(url)
      .then(r => r.json())
      .then(this.onFetchDone)
      .catch(this.onFetchError);
  }

  onFetchDone(json) {
    const {groupings} = json;
    this.setState({groupings});
  }

  onFetchError(error) {
    this.setState({error});
  }

  render() {
    const {groupings} = this.state;

    return (
      <div className="Groupings">
        <div className="Groupings-content">
          <p>
            {groupings.length === 0
              ? 'Waiting for pals to finish...'
              : 'Groupings'}
          </p>
          <div>
            {groupings.map((grouping) => {
              const {color, letter, cards} = grouping;
              return (
                <div key={letter}>
                  <div style={{background: color}}>group {letter}</div>
                  <div>
                    {cards.map((card) => {
                      return <div key={card.id}>{card.text}</div>;
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
Groupings.propTypes = {
  code: PropTypes.string.isRequired,
  groupSize: PropTypes.number.isRequired
};


export default Groupings;
