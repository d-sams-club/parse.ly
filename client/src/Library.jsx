import React from 'react';

const SongListEntry = (props) => {
  const { song } = props;
  ;
  
  return (
    <li className="listItems">
      <div className="song-title" onClick={titleClick} >
      {song.artist} | {song.songname}
      
      </div>
      
      <div className="score">
        <b>Score: </b>
        {`${Math.floor(song.score * 100)}% ${polarity} lyrics`}
      </div>
      {/* <button className="waves-effect waves-light btn blue accent-3" onClick={saveSong}>Save</button> */}
    </li>
  );
};

export default SongListEntry;
