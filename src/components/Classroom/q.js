// import Messages from './Messages';

import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { VideoPlayer } from './xx.js';
// import { compose } from 'recompose'
// import { withAuthorization, withEmailVerification } from '../Session'
// import { withFirebase } from '../Firebase'

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    type: 'video/mp4'
  }]
}

export default class PlayerControlExample extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      viewed: true,
      label: '',
    }
  }
  
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
        <div> 
          <VideoPlayer { ...videoJsOptions } />
            {authUser.username}
          </div>
        )}
      </AuthUserContext.Consumer>

    )
  }
}

// const condition = authUser => !!authUser;

// export default compose(
  // withFirebase,
  // withEmailVerification,
  // withAuthorization(condition),
// )(PlayerControlExample);
// import Messages from './Messages';
