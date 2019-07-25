import React from 'react';

const SongListEntry = (props) => {
  const { song, songTitleClick, polarity, handleSave } = props;
  const titleClick = () => {
    songTitleClick(`${song.artist} ${song.songname}`);
  };
  const saveSong = () => {
    handleSave(song);
  };
  return (
    <li className="listItems">
      {/* <div className="artist-name">
        <b>Artist: </b>
        {song.artist}
      </div> */}
      <div className="song-title" onClick={titleClick} >
      {song.artist} | {song.songname}
      
      </div>
      
      <div className="score">
        <b>Score: </b>
        {`${Math.floor(song.score * 100)}% ${polarity} lyrics`}
      </div>
      <button className="waves-effect waves-light btn blue accent-3" onClick={saveSong}>Save</button>
    </li>
  );
};

export default SongListEntry;
