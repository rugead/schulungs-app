import React from 'react';
import videojs from 'video.js'

import { AuthUserContext } from '../Session';
import { compose } from 'recompose'
import { withAuthorization, withEmailVerification } from '../Session'
import { withFirebase } from '../Firebase'

import './video-js.css'

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: 'https://baeckerei-muenzel.de/wp-content/uploads/Guglhupf_Video.mp4',
    type: 'video/mp4'
  }]
}

class VideoPlayer extends React.Component {

  state ={}
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function oayerReady() {
      console.log('onPlayerReady', this.props)
    
      this.on('ended', function() {
        // confirm(user)
        videojs.log('Awww...over so soon?!');
      });

    });
    console.log('onPlayerReadyaa', this.props)

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
          <video ref={ node => this.videoNode = node } className="video-js" ></video>
        </div>

      </div>
    )}
}


// const confirmIt = ({ firebase }) => (
  //   <Link to={'/'} onClick={firebase.doSignOut} className="navbar-item">
  //     abmelden
  //   </Link>
  // );
  
  
  const xxx = (props)=> {
    const ccc = props
    
    const confirm = (event, authUser) => {
      console.log('pwpsdwpd: ', ccc)
      ccc.firebase.lessons().add({
        url: 'this.state.url',
        titel: 'this.state.label',
        personalnummer: authUser.personalnummer,
        username: authUser.username,
        userId: authUser.uid,
        createdAt: props.firebase.fieldValue.serverTimestamp(),
      });
    
      event.preventDefault();
    }
  console.log('sssssssss', props)
  return (
    <AuthUserContext.Consumer>
      {authUser => (
    <div>
      <VideoPlayer { ...videoJsOptions } />
      <form onSubmit={event => confirm(event, authUser)}>
        <button type="submit" >confirm</button> 
      </form>
    </div>
    )}
    </AuthUserContext.Consumer>
  )
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
)(xxx);
