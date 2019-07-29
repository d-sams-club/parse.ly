/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import Scale from './Scale.jsx';


const SongListEntry = (props) => {
  const { song, songTitleClick, polarity, iconScore, scale, handleSave } = props;
  const songScore = `${Math.floor(song.score * 100)}`;
  const titleClick = () => {
    songTitleClick(`${song.artist} ${song.songname}`);
    // return <Scale score={songScore} />;
  };
  const saveSong = () => {
    handleSave(song);
  };
  // console.log(songScore);
  return (
    <div>
      <li className="listItems">
        <div className="song-title" onClick={titleClick}>
          {song.artist} | {song.songname}
        </div>
        <div className="score">
          {iconScore(polarity, songScore)}
        </div>
        <button className="waves-effect waves-light btn blue accent-3" onClick={saveSong}>Save</button>
      </li>
      {scale && <Scale score={songScore} /> }
    </div>
  );
};

export default SongListEntry;
