import React, { Component } from 'react';
// import { findDOMNode } from 'react-dom'

import { AuthUserContext } from '../Session';
// import { compose } from 'recompose'
// import { withAuthorization, withEmailVerification } from '../Session'
// import { withFirebase } from '../Firebase'

import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";


const sources = {
  sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
  bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
  test: 'http://media.w3.org/2010/05/video/movie_300.webm'
};

export default class PlayerControlExample extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: sources['bunnyMovie'],
      viewed: true,
      label: '',

    };

    // this.changeCurrentTime = this.changeCurrentTime.bind(this);
  }

  componentDidMount() {
    // const els2 = findDOMNode(this.refs.player)
    // subscribe state change
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
    // this.refs.player.duration.subscribeToStateChange(this.handleFinished.bind(this))
  }

  handleStateChange(state, prevState) {
    // copy player state to this component's state
    this.setState({
      player: state,
      currentTime: state.currentTime,
      duration: state.duration,
      ended: state.ended.toString(),  
    });
  }
  
  // componentDidUpdate() {
  //   // this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  //     if (this.state.currentTime === this.state.duration && this.state.ended === 'true') {
  //     console.log('ttttttrue', this.state.ended)
      // }
      

  // confirm = (event, authUser) => {
  //   console.log('authUser: ', authUser)
  //   this.props.firebase.lessons().add({
  //     url: this.state.url,
  //     titel: this.state.label,
  //     personalnummer: authUser.personalnummer,
  //     username: authUser.username,
  //     userId: authUser.uid,
  //     createdAt: this.props.firebase.fieldValue.serverTimestamp(),
  //   });

  //   event.preventDefault();
  // }

  
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <Player ref="els2">
              <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
            </Player>
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
