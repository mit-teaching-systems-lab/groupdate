import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TappableButton from './components/TappableButton';
import './Join.css';


// The join screen
class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupCode: ''
    };
    this.onStart = this.onStart.bind(this);
    this.onChangeGroupCode = this.onChangeGroupCode.bind(this);
  }

  componentDidMount() {
    if (this.inputEl) {
      this.inputEl.setAttribute('nochilddrag', 'nochilddrag'); // avoid dragscroll on container
      this.inputEl.focus();
    }
  }

  onChangeGroupCode(event) {
    const groupCode = event.target.value.toUpperCase();
    this.setState({groupCode});
  }

  onStart() {
    const {groupCode} = this.state;
    this.props.onNext(groupCode);
  }

  render() {
    const {groupCode} = this.state;

    return (
      <div className="Join">
        <div className="Join-content">
          <p>{`What's your group code?`}</p>
          <input
            ref={(el) => { this.inputEl = el; }} 
            className="Join-input"
            type="text"
            placeholder="WXYZ"
            value={groupCode}
            onChange={this.onChangeGroupCode} />
          <TappableButton onClick={this.onStart}>Start</TappableButton>
        </div>
      </div>
    );
  }
}
Join.propTypes = {
  onNext: PropTypes.func.isRequired
};

export default Join;
