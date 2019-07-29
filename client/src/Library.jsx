import React from 'react';
import axios from 'axios';
import Navigation from './navbar.jsx';
import App from './app.jsx';

class Library extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      songs: [],
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
       console.log('here', result.data);
      this.setState({
        songs: result.data,
      })
    }).catch((error) => {
      console.log('error', error);
    })
  } 

  removeSong(song) {
    console.log('song to delete', song);
    axios.delete('/library', {item: song})
    .then((response) => {
      console.log('response to delete request', response);
    }).catch((error) => {
      console.log(error);
    })
  }

  render() {
    console.log('current', this.songs);
    return (
      <React.Fragment>
        <Navigation />
        <div className="container">
          <h4>Library</h4>
          </div>
          
      {this.state.songs.map((song, index) => {
        return <li key={index} className="listItems">
        <div className="song-title" >
        {song.artistname} | {song.songname}
        
        </div>
        
        <div className="score">
          <b>Score: </b>
          {`${Math.floor(song.score * 100)}% ${song.polarity} lyrics`}
        </div>
        <button className="waves-effect waves-light btn blue accent-3" onClick={this.removeSong}>Remove</button>
      </li>
      })}
      </React.Fragment>
    );
  }
}

export default Library;
