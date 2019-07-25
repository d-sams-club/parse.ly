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
    this.happyEmojiScore = this.happyEmojiScore.bind(this);
  }

  componentWillMount() {
    const { location, history } = this.props;
    const query = queryString.parse(location.search);
    if (query.token) {
      window.localStorage.setItem('jwt', query.token);
      history.push('/music');
    }
  }

  happyEmojiScore(polarity, score) {
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
    return axios.get(`/video/${title}`).then((response) => {
      this.setState({
        video: response.data,
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
      query, songs, polarity, video,
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
            <SongList songs={songs} polarity={polarity} songTitleClick={this.songTitleClick} emojiScore={this.happyEmojiScore} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
