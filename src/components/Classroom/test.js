import React, { useLayoutEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./styles.css";

const useVideoJS = videoJsOptions => {
  const videoNode = useRef(null);
  const key = videoJsOptions.sources[0].src;
  useLayoutEffect(
    () => {
      const player = videojs(videoNode.current, videoJsOptions, () => {
        console.log("onPlayerReady", this);
      });
      return () => {
        player.dispose();
      };
    },
    [key]
  );
  return (
    <div>
      <div data-vjs-player key={key}>
        <video ref={videoNode} className="video-js" />
      </div>
    </div>
  );
};

// Changing the Video URL in the input field triggers an update
// The update should dispose of the player and initialize a new one
// On dispose, video.js removes its DOM node, so we need to force a rerender
// Thats why we have the key.

function App() {
  const [value, setValue] = useState("");
  const [videoUrl, setVideoUrl] = useState(
    "http://techslides.com/demos/sample-videos/small.mp4"
  );
  const player = useVideoJS({ sources: [{ src: videoUrl }] });
  return (
    <div className="App">
      {player}
      <input onChange={e => setVideoUrl(e.target.value)} value={videoUrl} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
