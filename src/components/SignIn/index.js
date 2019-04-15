import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
// 
import { SignUpLink } from '../SignUp';
// import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { Title, Input, Button, Block, Field, Label, Control, Help, Box } from 'rbx';

const SignInPage = () => (
  <div>
    <Title>
      Willkommen bei der Schulungs-App der Bäckerei Münzel
    </Title> 
    <Box>
      <SignInForm />
    </Box>
    <Box>
      <SignInGoogle />
    </Box>
    <Box>
      <SignUpLink />
    </Box>
  </div>
);


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;



class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.CLASSROOM);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Block>
      <form onSubmit={this.onSubmit}>
        <Field>
          <Label>Mit Email Adresse und Passwort anmelden</Label>
          <Control>
            <Input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
              autoComplete="email adresse"
            />
          </Control>
        </Field>

        <Field>
          <Label>Passwort</Label>
          <Control>
            <Input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
              autoComplete="password"
            />
          </Control>
        </Field>
        <Field>
          <Control>
            <Button disabled={isInvalid}>Submit</Button>
          </Control>
        </Field>

        {error && <p>{error.message}</p>}
      </form>
      </Block>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set(
          {
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: [],
          },
          { merge: true },
        );
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.CLASSROOM);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <Block>
      
      <form onSubmit={this.onSubmit}>
      <Field>
        <Label>Mit Google anmelden</Label>
          <Control>
            <Button type="submit">Sign In with Google</Button>
          </Control>
        </Field>
        <Help>Hier können Sie sich mit Ihrem Google-Konto anmelden</Help>
        {error && <p>{error.message}</p>}
      </form>
      
      </Block>
    );
  }
}

const SignInLink = () => (
  <Block>
    <Field>
      <Label>Mit Email Adresse und Passwort anmelden</Label>
        <Control>
        <Button as={Link} to={ROUTES.SIGN_IN}>Jetzt anmelden</Button>
        </Control>
    </Field>
    <Help>Hier können Sie sich mit Ihrer Email Adresse und Passwort vanmelden</Help>
  </Block>
);


const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

export default SignInPage;
// export default SignInForm;

export { SignInForm, SignInGoogle, SignInLink };

// export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
