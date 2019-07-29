/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';

const VideoPlayer = ({ video }) => {
  // const video = props.video;
  console.log('video', video);
  // Conditional Rendering Statement needed
  // console.log(video);
  // console.log(emojiClick);
  if (!video) {
    return <div> </div>;
  }
  // const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  // const videoId = video.id.videoId;
  // const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="videoPlayer">
      <div className="embed-responsive">
        <iframe className="embed-responsive-item" title="youtube-video" src={video.link} allowFullScreen align="right" height="500px" width="750px">
          {/* Video player with youtube link from api */}
        </iframe>
        <div className="container">
          {video.lyrics}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
