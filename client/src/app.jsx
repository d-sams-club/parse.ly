import React, { Component } from 'react';

import axios from 'axios';
import queryString from 'query-string';
import styles from '../dist/player.css';
import Navigation from './navbar.jsx';
import Search from './components/Search.jsx';
import SongList from './components/SongList.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';
import Library from './Library.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      video: '',
      query: '',
      songs: [],
      favSongs: [],
      polarity: '',
      sort: 'a-z',
    };
    this.clickSearch = this.clickSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.songTitleClick = this.songTitleClick.bind(this);
    this.handlePositivePolarity = this.handlePositivePolarity.bind(this);
    this.handleNegativePolarity = this.handleNegativePolarity.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
  }

  componentWillMount() {
    const query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem('jwt', query.token);
      this.props.history.push('/music');
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

  handleSave(song) {
    console.log('click app');
    console.log('current log', song);
    axios.post('/library', {
      song: song
    }).then((response) => {
      console.log('response', response);
    }).catch((error) => {
      console.log(error);
    })
    
  }

  songTitleClick(title) {
    return axios.get(`/video/${title}`).then((response) => {
      this.setState({
        video: response.data,
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

  handleSortClick() {
    if (this.state.sort === 'mood') {
      this.setState({
        sort: 'a-z',
      });
    } else {
      this.setState({
        sort: 'mood',
      });
    }
  }
  // handleClick() {
  //   this.setState(state => ({
  //     isToggleOn: !state.isToggleOn
  //   }));


  render() {
    const {
      query, songs, polarity, video, sort
    } = this.state;
    return (
      <React.Fragment>
        <Navigation />
        Sort By <button className="sortButton" onClick={this.handleSortClick} type="button">{sort}</button>
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
            <VideoPlayer video={video} />
          </div>
          <div className="songTitles">
            <SongList songs={songs} polarity={polarity} songTitleClick={this.songTitleClick} handleSave={this.handleSave} sort={sort} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
