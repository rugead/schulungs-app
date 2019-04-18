import React, { Component } from 'react';
import { compose } from 'recompose';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { withFirebase } from '../Firebase';
import PasswordChangeForm from '../PasswordChange';

import { Button, Title, Input, Field, Control, Box, Label } from 'rbx'

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null,
  },
  {
    id: 'google.com',
    provider: 'googleProvider',
  },
  // {
  //   id: 'facebook.com',
  //   provider: 'facebookProvider',
  // },
  // {
  //   id: 'twitter.com',
  //   provider: 'twitterProvider',
  // },
];

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <Title>Passwort ändern und Anmeldemethoden ändern</Title>
        <PasswordChangeForm authUser={authUser}/>
        <LoginManagement authUser={authUser} />
  
      </div>
    )}
  </AuthUserContext.Consumer>
);

class LoginManagementBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSignInMethods: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchSignInMethods();
  }

  fetchSignInMethods = () => {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then(activeSignInMethods =>
        this.setState({ activeSignInMethods, error: null }),
      )
      .catch(error => this.setState({ error }));
  };

  onSocialLoginLink = provider => {
    this.props.firebase.auth.currentUser
      .linkWithPopup(this.props.firebase[provider])
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  onDefaultLoginLink = password => {
    const credential = this.props.firebase.emailAuthProvider.credential(
      this.props.authUser.email,
      password,
    );

    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  onUnlink = providerId => {
    this.props.firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  render() {
    const { activeSignInMethods, error } = this.state;

    return (
      <div>
          {SIGN_IN_METHODS.map(signInMethod => {
            const onlyOneLeft = activeSignInMethods.length === 1;
            const isEnabled = activeSignInMethods.includes(
              signInMethod.id,
            );

            return (
              <Box key={signInMethod.id}>
                {signInMethod.id === 'password' ? (
                  
                  <DefaultLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={this.onDefaultLoginLink}
                    onUnlink={this.onUnlink}
                  />
                  
                ) : (
                  
                  <SocialLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={this.onSocialLoginLink}
                    onUnlink={this.onUnlink}
                  />
                  
                )}
              </Box>
            );
          })}
        {error && error.message}
      </div>
    );
  }
}

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink,
}) =>
  isEnabled ? (
    
      <Field>
        <Label>Mit {signInMethod.id} anmelden</Label>
        <Control>
          <Button
            color="primary"
            type="button"
            onClick={() => onUnlink(signInMethod.id)}
            disabled={onlyOneLeft}
          >
            {signInMethod.id}
          </Button>
        </Control>
      </Field>
    
  ) : (
    
      <Field>
        <Label>Mit {signInMethod.id} anmelden</Label>
        <Control>
          <Button
            color="primary"
            type="button"
            onClick={() => onLink(signInMethod.provider)}
          >
            {signInMethod.id}
          </Button>
        </Control>
      </Field>
    
  );

class DefaultLoginToggle extends Component {
  constructor(props) {
    super(props);

    this.state = { passwordOne: '', passwordTwo: '' };
  }

  onSubmit = event => {
    event.preventDefault();

    this.props.onLink(this.state.passwordOne);
    this.setState({ passwordOne: '', passwordTwo: '' });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      onlyOneLeft,
      isEnabled,
      signInMethod,
      onUnlink,
    } = this.props;

    const { passwordOne, passwordTwo } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return isEnabled ? (
    
        <Field>
          <Label>{signInMethod.id} Anmeldung deaktivieren</Label>
          <Control>
            <Button
              color="primary"
              type="button"
              onClick={() => onUnlink(signInMethod.id)}
              disabled={onlyOneLeft}
            >
              {signInMethod.id}
            </Button>
          </Control>
        </Field>
    
    ) : (
    
      <form onSubmit={this.onSubmit}>
        <Field>
          <Label>Passwort Anmeldung deaktivieren</Label>
          <Control>
            <Input
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Passwort"
              autoComplete="password-new"
            />
            <Input
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Passwort bestätigen"
              autoComplete="password-new"
            />
          </Control>
        </Field>

        <Button disabled={isInvalid} type="submit" color="primary">
        Passwort-Anmeldung deaktivieren
        </Button>
      </form>
    
    );
  }
}

const LoginManagement = withFirebase(LoginManagementBase);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);
