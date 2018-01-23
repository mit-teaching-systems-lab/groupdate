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
      console.log('updatedRatings', updatedRatings);
      this.setState({ ratings: updatedRatings });
    } else {
      console.log('onNext');
      this.props.onNext();
    }
  }

  render() {
    const card = this.currentCard();
    const {id, text} = card;
    console.log('card', card);

    return (
      <div className="Swiping">
        <div className="Swiping-content">
          <p>Swipe right if you want to talk more, left if not.</p>
          <Swipeable
            key={id}
            height={150}
            onSwipeRight={this.onSwipe.bind(this, card, 1)}
            onSwipeLeft={this.onSwipe.bind(this, card, 0)}
          >
            <div>&quot;{text}&quot;</div>,
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
