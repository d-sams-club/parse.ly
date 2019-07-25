/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';

const SongListEntry = (props) => {
  const { song, songTitleClick, polarity, iconScore } = props;
  const titleClick = () => {
    songTitleClick(`${song.artist} ${song.songname}`);
  };
  const songScore = `${Math.floor(song.score * 100)}`;
  console.log(song.songname, songScore);
  console.log(polarity);
  console.log(iconScore(songScore));
  return (
    <li className="listItems">
      {/* <div className="artist-name">
        <b>Artist: </b>
        {song.artist}
      </div> */}
      <div className="song-title" onClick={titleClick}>
        {song.artist} | {song.songname}
      </div>

      <div className="score">
        {/* <b>Score: </b> */}
        {iconScore(polarity, songScore)}
        {/* {`${songScore}% ${polarity} lyrics`}
        <img src="/images/dummyhappy.png" alt="happy" /> */}
      </div>
    </li>
  );
};

export default SongListEntry;
