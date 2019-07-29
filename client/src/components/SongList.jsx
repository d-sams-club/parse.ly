/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

import SongListEntry from './SongListEntry.jsx';

const SongList = (props) => {
  const { songs, polarity, songTitleClick, sort, handleSave, emojiScore, showScale } = props;
  const compare = (a, b) => {
    let comparison;
    if (sort === 'a-z') {
      if (a.score < b.score) {
        comparison = 1;
      } else if (a.score > b.score) {
        comparison = -1;
      }
    } else if (a.songname[0] > b.songname[0]) {
      comparison = 1;
    } else if (a.songname[0] < b.songname[0]) {
      comparison = -1;
    }
    return comparison;
  };
  let songview;
  if (polarity === 'positive') {
    songview = songs.filter(song => song.score > 0.501)
      .sort(compare).map((song, i) => <SongListEntry song={song} key={i} songTitleClick={songTitleClick} polarity={polarity} handleSave={handleSave} iconScore={emojiScore} scale={showScale} />);
  } else if (polarity === 'negative') {
    songview = songs.filter(song => song.score > 0.501)
      .sort(compare).map((song, i) => <SongListEntry song={song} key={i} songTitleClick={songTitleClick} polarity={polarity} handleSave={handleSave} iconScore={emojiScore} scale={showScale} />);
  }

  return (
    <React.Fragment>
      {/* <div className="lastContainer"> */}
      {/* <div className="container"> */}

      <ul className="left mplpx">
        {/* <SongListEntry /> */}
        {/* Map over each Song Entry to render in list form */}
        {/* {this props object will have an array of objects that will have
        these properties
        -songname
        -artist
        -score
        -polarity} */}
        {songview}
      </ul>
      {/* </div> */}
    </React.Fragment>
  );
};

export default SongList;
