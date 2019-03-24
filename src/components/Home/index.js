import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import Messages from '../Messages';
import VideoPlayer from '../Classroom';
 
const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    type: 'video/mp4'
  }]
}

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.firebase
      .users()
      .onSnapshot(snapshot => {
        let users = {};
        snapshot.forEach(doc => (users[doc.id] = doc.data()));

        this.setState({
          users,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p> classnameThe Home Page is accessible by every signed in user.</p>
        <VideoPlayer { ...videoJsOptions } />
        <Messages users={this.state.users} />
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
