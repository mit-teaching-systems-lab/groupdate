import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TappableButton from './components/TappableButton';
import dog from './img/charles-716555-unsplash.jpg';
import './Join.css';


// The join screen
class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      name: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
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

  onNameChange(event) {
    const name = event.target.value.toLowerCase();
    this.setState({name});
  }

  // For the enter keypress
  onSubmit(event) {
    event.preventDefault();
    this.onStart();
  }

  onStart() {
    const {code, name} = this.state;
    this.props.onNext({code, name});
  }

  render() {
    const {code, name} = this.state;

    return (
      <div className="Join">
        <div style={{textAlign: 'center', marginTop: 0, marginBottom: 0}}>
          <div className="Global-title" style={{position: 'absolute', left: 15, top: 15, color: 'black', fontSize:36}}>labelit</div>
          <img alt="labelit dog" src={dog} width="100%" style={{minHeight: 220}} />
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
          <div className="Global-title">{`What's your first name?`}</div>
          <input
            className="Join-input"
            type="text"
            value={name}
            onChange={this.onNameChange} />
          <input type="button" value="Next" style={{display: 'none'}} />
          <TappableButton
            style={{marginBottom: 20}}
            disabled={code.length === 0 || name.length === 0}
            onClick={this.onStart}>Next</TappableButton>
        </form>
      </div>
    );
  }
}
Join.propTypes = {
  onNext: PropTypes.func.isRequired
};

export default Join;
