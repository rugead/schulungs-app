import React from 'react';
import videojs from 'video.js'

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log("TCL: VideoPlayer -> this.props", this)
    });
    console.log("videoNode", this.videoNode)

  //   this.player.on('playing', function() {
	// 		console.log("TCL: VideoPlayer -> componentDidMount -> 'ended'", 'currentTime')
  //   });

    
  //   var lengthOfVideo = videojs(this.videoNode.duration, function xxx() {

  //     };
  //   });
  var myPlayer = videojs(this.videoNode)
  
  myPlayer.on('ended', function() {
        console.log('lengthOfVideo');

    // this.dispose();
  });
  
}

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (
      <div>    
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js"></video>
        </div>
      </div>
    )
  }
}
