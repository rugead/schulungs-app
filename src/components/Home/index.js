import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { Title } from 'rbx'
import Lessons from '../Lessons'

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
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <Title>Willkommen {authUser.username} </Title>
            <Lessons authUser={authUser} />
          </div>

        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
