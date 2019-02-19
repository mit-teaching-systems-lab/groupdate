import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipeable from './components/Swipeable';
import './Swiping.css';


// The Swiping screen
class Swiping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: []
    };
    this.onSwipe = this.onSwipe.bind(this);
  }

  currentCard() {
    const {cards} = this.props;
    const {ratings} = this.state;
    return cards[ratings.length];
  }

  onSwipe(card, rating) {
    const {cards} = this.props;
    const {ratings} = this.state;
    const updatedRatings = ratings.concat([rating]);
    this.props.doPostRating(card, rating); // fire and forget

    if (updatedRatings.length < cards.length) {
      this.setState({ ratings: updatedRatings });
    } else {
      this.props.onNext();
    }
  }

  render() {
    const {cards} = this.props;
    const {ratings} = this.state;
    const remainingCount = cards.length - ratings.length;

    const card = this.currentCard();
    const {id, text, src} = card;
    
    return (
      <div className="Swiping">
        <div className="Global-content">
          <div className="Global-title">Swipe right if the animal is cute, left if not.</div>
          <p className="Swiping-left">{remainingCount} more</p>
          <Swipeable
            key={id}
            height={150}
            onSwipeRight={this.onSwipe.bind(this, card, 1)}
            onSwipeLeft={this.onSwipe.bind(this, card, 0)}
          >
            <div className="Swiping-card" style={{overflow: 'hidden'}}>
              <img src={src} alt={text} height="auto" width="100%" />
            </div>
          </Swipeable>
        </div>
      </div>
    );
  }
}
Swiping.propTypes = {
  code: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  doPostRating: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

export default Swiping;
