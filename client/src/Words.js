import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TappableButton from './components/TappableButton';
import './Words.css';


// The Words screen
class Words extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: '',
      error: null
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onChangeWords = this.onChangeWords.bind(this);
    this.onPostDone = this.onPostDone.bind(this);
    this.onPostError = this.onPostError.bind(this);
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
    const {code} = this.props;
    const {words} = this.state;
    this.props.doPostCard(code, words)
      .then(this.onPostDone.bind(this, words))
      .catch(this.onPostError);
  }

  // For the enter keypress
  onSubmit(event) {
    event.preventDefault();
    this.onNext();
  }

  onPostDone(words, json) {
    this.props.onNext(words);
  }

  onPostError(error) {
    this.setState({error});
  }

  render() {
    const {limit} = this.props;
    const {words} = this.state;
    const wordsLeft = (words === '')
      ? limit
      : limit - words.trim().split(' ').length;

    return (
      <div className="Words">
        <form className="Global-content" action="#" onSubmit={this.onSubmit}>
          <div className="Global-title">
            What are you thinking about?
          </div>
          <textarea
            ref={(el) => { this.inputEl = el; }} 
            className="Words-input"
            placeholder="..."
            rows="1"
            value={words}
            onChange={this.onChangeWords} />
          <p
            className="Words-left"
            style={{color: wordsLeft > 0 ? 'black' : 'red'}}>{wordsLeft} words left</p>
          <TappableButton
            disabled={words === '' || wordsLeft < 0}
            onClick={this.onNext}>Next</TappableButton>
        </form>
      </div>
    );
  }
}
Words.propTypes = {
  code: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  doPostCard: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

export default Words;
