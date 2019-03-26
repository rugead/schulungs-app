import React from 'react';
// import videojs from 'video.js'

import { AuthUserContext } from '../Session';
import { compose } from 'recompose'
import { withAuthorization, withEmailVerification } from '../Session'
import { withFirebase } from '../Firebase'
// import videojs from 'video.js'

import VideoPlayer from './q.js'

import './video-js.css'


const videoJsOptions = {
  autoplay: true,
  controls: true,
  fluid: true,
  sources: [{
    src: 'https://baeckerei-muenzel.de/wp-content/uploads/Guglhupf_Video.mp4',
    type: 'video/mp4'
  }]
}

// const videoName = 

class HygieneVideo extends React.Component {
  state = {
    
  }
  
  componentDidMount() {
    console.log('kk', this.props)
    // this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
    //   console.log("TCL: VideoPlayer -> this.props", this)
    // });

	// 	console.log("TCL: HygieneVideo -> componentDidMount -> this.props", this.props)
  }
  
  // componentWillUnmount() {
  //   if (this.player) {
  //     this.player.dispose()
  //   }
  // }
  
  confirmWatched(e, authUser) {
    this.props.firebase.lessons().add({
      url: 'this.state.url',
      titel: 'this.state.label',
      source: videoJsOptions.sources.src,
      personalnummer: authUser.personalnummer,
      username: authUser.username,
      userId: authUser.uid,
      createdAt: this.props.firebase.fieldValue.serverTimestamp(),
    });
  
    e.preventDefault();
  }

  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <VideoPlayer { ...videoJsOptions } />
          <form onSubmit={e => this.confirmWatched(e, authUser)}>
            <button type="submit" >confirm</button> 
          </form>
        </div>
        )}
    </AuthUserContext.Consumer>    )}
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
)(HygieneVideo);
