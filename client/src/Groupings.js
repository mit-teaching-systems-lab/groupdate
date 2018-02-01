import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Groupings.css';
import GroupingsView from './GroupingsView';


// The Groupings screen
class Groupings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupings: [],
      votesCount: 0,
      error: null
    };
    this.refreshTimer = null;
    this.refreshResponses = this.refreshResponses.bind(this);
    this.onFetchDone = this.onFetchDone.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
  }

  // Poll the server for new responses
  // Save URL for refresh
  componentDidMount() {
    this.refreshResponses();
    this.refreshTimer = setInterval(this.refreshResponses, 3000);
    this.setUrl();
  }

  componentWillUnmount(){
    clearInterval(this.refreshTimer);
  }

  setUrl() {
    const {code} = this.props;
    window.history.pushState({}, '', `/groups/${code}`);
  }

  refreshResponses() {
    const {code, groupCount} = this.props;
    const url = `/games/${code}/groupings?n=${groupCount}`;
    fetch(url)
      .then(r => r.json())
      .then(this.onFetchDone)
      .catch(this.onFetchError);
  }

  onFetchDone(json) {
    const {groupings, votesCount} = json;
    this.setState({groupings, votesCount});
  }

  onFetchError(error) {
    this.setState({error});
  }

  render() {
    const {code} = this.props;
    const {groupings, votesCount} = this.state;

    return (
      <div className="Groupings">
        {groupings.length === 0
          ? <div className="Global-content">Waiting for pals to finish...</div>
          : <GroupingsView
            code={code}
            groupings={groupings}
            votesCount={votesCount} />}
      </div>
    );
  }
}
Groupings.propTypes = {
  code: PropTypes.string.isRequired,
  groupCount: PropTypes.number.isRequired
};


export default Groupings;
