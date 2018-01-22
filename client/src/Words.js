import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TappableButton from './components/TappableButton';
import './Words.css';


// The Words screen
class Words extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ''
    };
    this.onNext = this.onNext.bind(this);
    this.onChangeWords = this.onChangeWords.bind(this);
  }

  componentDidMount() {
    if (this.inputEl) {
      this.inputEl.setAttribute('nochilddrag', 'nochilddrag'); // avoid dragscroll on container
      this.inputEl.focus();
    }
  }

  onChangeWords(event) {
    const words = event.target.value;
    this.setState({words});
  }

  onNext() {
    const {words} = this.state;
    this.props.onNext(words);
  }

  render() {
    const {words} = this.state;

    return (
      <div className="Words">
        <div className="Words-content">
          <p>
            What are you thinking?
          </p>
          <textarea
            ref={(el) => { this.inputEl = el; }} 
            className="Words-input"
            placeholder="..."
            value={words}
            onChange={this.onChangeWords} />
          <TappableButton onClick={this.onNext}>Share</TappableButton>
        </div>
      </div>
    );
  }
}
Words.propTypes = {
  onNext: PropTypes.func.isRequired
};

export default Words;
