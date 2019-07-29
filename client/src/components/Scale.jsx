/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class Scale extends Component {
  constructor(props) {
    super(props);
    const { score } = props;
    this.state = {
      songScore: score,
    };
    this.changeScore = this.changeScore.bind(this);
    this.randomInt = this.randomInt.bind;
  }

  componentDidMount() {
    const { score } = this.props;
    console.log('one score', score);
  }

  changeScore(newScore) {
    this.setState({
      songScore: newScore,
    });
    console.log(newScore);
  }

  randomInt(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  render() {
    return (
      <React.Fragment>
        <div className="details">
          <div>
            {/* Song Info; maybe Score info? */}
            <h4 id="emojiHeader">
            Disagree with our ratings? What do you think?
            </h4>
            <img src="/images/dummyhappy.png" alt="happy" id="veryHappy" onClick={this.changeScore(this.randomInt(75, 100))} />
            <img src="/images/ModerateHappy.png" alt="semi-happy" id="moderateHappy" onClick={this.changeScore(this.randomInt(51, 74))} />
            <img src="/images/Neutral.png" alt="neutral" id="Neutral" onClick={this.changeScore(50)} />
            <img src="/images/dummySad.png" alt="dumSad" id="moderateSad" onClick={this.changeScore(this.randomInt(25, 49))} />
            <img src="/images/HellaSad.png" alt="sad" id="verySad" onClick={this.changeScore(this.randomInt(1, 24))} />
          </div>
        </div>
      </React.Fragment>

    );
  }
}

export default Scale;
