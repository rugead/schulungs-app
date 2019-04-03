import React from 'react';
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import { withAuthorization, withEmailVerification } from '../Session'
import { AuthUserContext } from '../Session';
import VideoPlayer from './VideoPlayer.js'
import './video-js.css'

const videoJsOptions = {
  autoplay: false,
  controls: true,
  fluid: true,
  sources: [{
    src: 'https://baeckerei-muenzel.de/wp-content/uploads/Guglhupf_Video.mp4',
    type: 'video/mp4'
  }]
}

class HygieneVideo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      personalnummer: ''
    };
  }
    
  confirmWatched = (ev, props, personalnummer) => {
    const url = props.sources[0].src
    const title = url.substr(url.lastIndexOf('/') + 1);
    
    this.props.firebase.lessons().add({
      url: url,
      titel: title,
      source: props.sources,
      personalnummer: personalnummer,
      username: props.authUser.username,
      userId: props.authUser.uid,
      createdAt: new Date(Date.now()),
    });
    
    this.props.history.push('/home');
    ev.preventDefault();
  }

  handleDisabled = () => {
    this.setState({disabled: false})
  }

  render() {
    const { confirmWatched } = this
    const { disabled, personalnummer } = this.state
    const { handleDisabled } = this

    return (
      <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <VideoPlayer
            { ...videoJsOptions }
            confirmWatched={confirmWatched }
            authUser={authUser}
            disabled={disabled}
            personalnummer={personalnummer}
            handleDisabled={handleDisabled}
          />
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
