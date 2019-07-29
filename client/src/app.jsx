/* eslint-disable no-else-return */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import axios from 'axios';
import queryString from 'query-string';
import styles from '../dist/player.css';
import Navigation from './navbar.jsx';
import Search from './components/Search.jsx';
import SongList from './components/SongList.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';
// import Scale from './components/Scale.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      video: '',
      query: '',
      songs: [],
      polarity: '',
    };
    this.clickSearch = this.clickSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.songTitleClick = this.songTitleClick.bind(this);
    this.handlePositivePolarity = this.handlePositivePolarity.bind(this);
    this.handleNegativePolarity = this.handleNegativePolarity.bind(this);
    this.emojiScore = this.emojiScore.bind(this);
    this.showScale = false;
    // this.emojiClick = this.emojiClick.bind(this);
    // this.scaleRender = this.scaleRender.bind(this);
  }

  componentWillMount() {
    const { location, history } = this.props;
    const query = queryString.parse(location.search);
    if (query.token) {
      window.localStorage.setItem('jwt', query.token);
      history.push('/music');
    }
  }

  // emojiClick(newScore) {
  //   const { score } = this.state;
  //   console.log('emojiClick', score, newScore);
  //   this.setState({
  //     score: newScore,
  //   });
  // }

  emojiScore(polarity, score) {
    // const { songs } = this.state;
    // very sad score
    const newScore = Number(score);
    console.log(newScore);
    if (polarity === 'positive') {
      if (newScore < 25) {
        return <img src="/images/HellaSad.png" alt="sad" position="absolute" height="50px" width="50px" />;
      } else if (newScore > 25 && newScore < 49) {
        return <img src="/images/dummySad.png" alt="dumSad" position="absolute" height="50px" width="50px" />;
      } else if (newScore === 50) {
        return <img src="/images/Neutral.png" alt="neutral" position="absolute" height="50px" width="50px" />;
      } else if (newScore > 50 && newScore < 75) {
        return <img src="/images/ModerateHappy.png" alt="semi-happy" position="absolute" height="50px" width="50px" />;
      } else {
        return <img src="/images/dummyhappy.png" alt="happy" position="absolute" height="63px" width="63px" />;
      }
    }
    if (polarity === 'negative') {
      if (newScore < 25) {
        return <img src="/images/dummyhappy.png" alt="happy" position="absolute" height="63px" width="63px" />;
      } else if (newScore > 25 && newScore < 49) {
        return <img src="/images/ModerateHappy.png" alt="semi-happy" position="absolute" height="50px" width="50px" />;
      } else if (newScore === 50) {
        return <img src="/images/Neutral.png" alt="neutral" position="absolute" height="50px" width="50px" />;
      } else if (newScore > 50 && newScore < 75) {
        return <img src="/images/dummySad.png" alt="dumSad" position="absolute" height="50px" width="50px" />;
      } else {
        return <img src="/images/HellaSad.png" alt="sad" position="absolute" height="50px" width="50px" />;
      }
    }
  }

  // scaleRender() {
  //   return (
  //     <div className="details">
  //       <div>
  //         {/* Song Info; maybe Score info? */}
  //         <h4 id="emojiHeader">
  //           Disagree with our ratings? What do you think?
  //         </h4>
  //         <img src="/images/dummyhappy.png" alt="happy" id="veryHappy" />
  //         <img src="/images/ModerateHappy.png" alt="semi-happy" id="moderateHappy" />
  //         <img src="/images/Neutral.png" alt="neutral" id="Neutral" />
  //         <img src="/images/dummySad.png" alt="dumSad" id="moderateSad" />
  //         <img src="/images/HellaSad.png" alt="sad" id="verySad" />
  //       </div>
  //     </div>
  //   );
  // }

  clickSearch() {
    const { query } = this.state;
    return axios.get(`/search/${query}`).then((response) => {
      this.setState({
        songs: response.data,
      });
    });
  }

  handleChange(e) {
    this.setState({
      query: e.target.value,
    });
  }

  songTitleClick(title) {
    console.log(title);
    return axios.get(`/video/${title}`).then((response) => {
      this.setState({
        video: response.data,
        showScale: true,
      })
        .catch((err) => {
          console.log('failed to search YT: ', err);
        });
    });
  }

  handleNegativePolarity() {
    this.setState({
      polarity: 'negative',
    });
  }

  handlePositivePolarity() {
    this.setState({
      polarity: 'positive',
    });
  }


  render() {
    const {
      query, songs, polarity, video, showScale
    } = this.state;
    return (
      <React.Fragment>
        <Navigation />
        <div className="container">
          <h4>Who do you want to listen to?</h4>
        </div>
        <div className="col-md-6 offset-md-3">
          <Search
            query={query}
            change={this.handleChange}
            search={this.clickSearch}
            positivePolarity={this.handlePositivePolarity}
            negativePolarity={this.handleNegativePolarity}
          />
        </div>
        <div className="section">
          <div className="player">
            {/* need to pass in the scale function here */}
            <VideoPlayer video={video} />
          </div>
          <div className="songTitles">
            <SongList songs={songs} polarity={polarity} songTitleClick={this.songTitleClick} emojiScore={this.emojiScore} scale={showScale} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
