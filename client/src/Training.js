import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Trainer from './training/Trainer';


class Training extends Component {
  constructor(props) {
    super(props);

    this.imgEls = {};
    this.trainer = new Trainer();
    this.onTrain = this.onTrain.bind(this);
  }

  componentWillUnmount(){
    this.imgEls = undefined;
    this.trainer = undefined;
  }

  // prefetchImages() {
  //   const {labels} = this.props;
  //   labels.forEach(label => new Image().src = label.card.src);
  // }
  
  async onTrain() {
    const {labels} = this.props;
    await this.trainer.init();

    labels.forEach(label => {
      const {card, rating} = label;
      const imgEl = this.imgEls[card.id];
      if (!imgEl) return;
      
      this.trainer.addExample(imgEl, rating);
    });
  }

  render() {
    const {modelEl, labels} = this.props;

    return (
      <div className="Training">
        <div>{modelEl}</div>
        <button onClick={this.onTrain}>train</button>
        {labels.map(label => {
          const {card, rating} = label;
          return (
            <div key={card.id}>
              <img
                ref={el => this.imgEls[card.id] = el}
                src={card.src}
                width="100%"
                height="auto"
                alt={card.text} />
              <div style={{background: '#333', color: 'white', padding: 10}}>{rating === 1 ? 'yes' : 'no'}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
Training.propTypes = {
  modelEl: PropTypes.node.isRequired,
  labels: PropTypes.array.isRequired
};


export default Training;
