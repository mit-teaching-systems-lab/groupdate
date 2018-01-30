import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TappableButton from './components/TappableButton';
import logo from './groupdate.jpeg';
import './Join.css';


// The join screen
class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
  }

  componentDidMount() {
    if (this.inputEl) {
      this.inputEl.setAttribute('nochilddrag', 'nochilddrag'); // avoid dragscroll on container
      this.inputEl.focus();
    }
  }

  onCodeChange(event) {
    const code = event.target.value.toLowerCase();
    this.setState({code});
  }

  // For the enter keypress
  onSubmit(event) {
    event.preventDefault();
    this.onStart();
  }

  onStart() {
    const {code} = this.state;
    this.props.onNext(code);
  }

  render() {
    const {code} = this.state;

    return (
      <div className="Join">
        <div style={{textAlign: 'center', marginTop: 0, marginBottom: 10}}>
          <div className="Global-title" style={{position: 'absolute', left: 15, top: 15, color: 'black', fontSize:36}}>groupdate</div>
          <img src={logo} width="100%" />
        </div>
        <form className="Global-content" action="#" onSubmit={this.onSubmit}>
          <div className="Global-title">{`What's your group code?`}</div>
          <input
            ref={(el) => { this.inputEl = el; }} 
            className="Join-input"
            type="text"
            placeholder="otter"
            value={code}
            onChange={this.onCodeChange} />
          <input type="button" value="Next" style={{display: 'none'}} />
          <TappableButton disabled={code.length === 0} onClick={this.onStart}>Next</TappableButton>
        </form>
      </div>
    );
  }
}
Join.propTypes = {
  onNext: PropTypes.func.isRequired
};

export default Join;
