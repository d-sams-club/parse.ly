/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';

const VideoPlayer = ({ video, emojiClick }) => {
  // const video = props.video;
  // Conditional Rendering Statement needed
  // console.log(video);
  // console.log(emojiClick);
  if (!video) {
    return <div> </div>;
  }
  // const videoId = video.id.videoId;
  // const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="videoPlayer">
      <div className="embed-responsive">
        <iframe className="embed-responsive-item" title="youtube-video" src={video} allowFullScreen align="right" height="500px" width="750px" />
      </div>
      <div className="details">
        <div>
          {/* Song Info; maybe Score info? */}
          <h3 id="emojiHeader">
          How do you feel?
          </h3>
          <img src="/images/dummyhappy.png" alt="happy" id="veryHappy" />
          <img src="/images/ModerateHappy.png" alt="semi-happy" id="moderateHappy" />
          <img src="/images/Neutral.png" alt="neutral" id="Neutral" />
          <img src="/images/dummySad.png" alt="dumSad" id="moderateSad" />
          <img src="/images/HellaSad.png" alt="sad" id="verySad" />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
