import React from 'react';
import axios from 'axios';
import Navigation from './navbar.jsx';
import App from './app.jsx';

class Library extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      songs: [{
        songname: 'test',
        artist: 'radiohead',
        trackId: 131252745,
        score: 0.543400228023529,
        polarity: 'positive',
      }],
    };

    this.favoriteSongs = this.favoriteSongs.bind(this);
    this.removeSong = this.removeSong.bind(this);
    
  }

  componentDidMount() {
    this.favoriteSongs();
  }

  favoriteSongs() {
    console.log('click');
    axios.get('/library').then((result) => {
      console.log('this is the result', result);
      // this.songs = result.data;
      console.log('here', this.songs);
      this.setState({
        songs: result.data,
      })
    }).catch((error) => {
      console.log('error', error);
    })
  } 
  removeSong(song) {
    
  }

  render() {
    console.log('current', this.songs);
    return (
      <React.Fragment>
        <Navigation />
        <div className="container">
          <h4>Library</h4>
          </div>
          
          <div className="song-title">
      {this.state.songs.map((song, index) => {
        return <li key={index} className="listItems">
        <div className="song-title" >
        {song.artist} | {song.songname}
        
        </div>
        
        <div className="score">
          <b>Score: </b>
          {`${Math.floor(song.score * 100)}% ${song.polarity} lyrics`}
        </div>
        <button className="waves-effect waves-light btn blue accent-3">Remove</button>
      </li>
      })}
    </div>  
      </React.Fragment>
    );
  }
}

export default Library;
